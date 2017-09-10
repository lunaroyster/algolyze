/* global angular */

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
    algorithmService.getAlgorithms = getAlgorithms;
    return algorithmService;
});

app.controller('homeController', function($scope, dataService) {
    
});

app.controller('searchController', function($scope, algorithmService) {
    $scope.results = [];
    $scope.initialize = ()=> {
        algorithmService.getAlgorithms()
        .then((algorithmList)=> {
            $scope.results = algorithmList;
        });
    };
    $scope.initialize();
});
