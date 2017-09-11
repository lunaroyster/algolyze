/* global angular Fuse */

var app = angular.module("algolyze", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    
    .when('/', {
        controller  : 'searchController',
        templateUrl : './views/search.html'
    });
    
}]);

app.service('dataService', function($http) {
    this.fetchAlgorithms = ()=> {
        return $http.get('algorithms/compiled.json')
        .then((response)=> {
            return response.data;
        });
    };
});

app.factory('algorithmService', function(dataService, $q) {
    var algorithmService = {};
    var algorithmList = undefined;
    
    var getAlgorithms = function() {
        return $q((resolve, reject) => {resolve()})
        .then(()=> {
            if(algorithmList) return;
            return dataService.fetchAlgorithms()
            .then((algList)=> {
                algorithmList = algList;
            });
        })
        .then(()=> {
            return algorithmList;
        });
    };
    
    var initialize = ()=> {
        var fuseOptions = {
            shouldSort: true,
            findAllMatches: true,
            includeScore: true,
            includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 50,
            maxPatternLength: 32,
            minMatchCharLength: 4,
            keys: [
                "name",
                "longName",
                "tags",
                "description"
            ]
        };
        getAlgorithms()
        .then((algorithmList)=> {
            var fuse = new Fuse(algorithmList, fuseOptions);
            algorithmService.fuse = fuse;
        });
    };
    initialize();
    
    var fuzzySearch = function(term) {
        return algorithmService.fuse.search(term);
    };
    
    algorithmService.getAlgorithms = getAlgorithms;
    algorithmService.fuzzySearch = fuzzySearch;
    return algorithmService;
});

app.controller('homeController', function($scope, dataService) {
    
});

app.controller('searchController', function($scope, algorithmService) {
    $scope.initialize = ()=> {
        
    };
    $scope.initialize();
    
    
    $scope.results = ()=> {
        var algorithms = [];
        for(var result of algorithmService.fuzzySearch($scope.searchTerm)) {
            algorithms.push(result.item);
        }
        return algorithms;
    };
});
