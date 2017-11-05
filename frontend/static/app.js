/* global angular Fuse markdown */

var app = angular.module("algolyze", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/', {
        controller  : 'searchController',
        templateUrl : './views/search.html'
    })
    
    .when('/a/:algorithm', {
        controller  : 'algorithmPageController',
        templateUrl : './views/algorithmPage.html'
    })
    
    .otherwise({
        controller  : '404Controller',
        templateUrl : './views/404.html'
    });
    
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);

app.service('dataService', function($http) {
    this.fetchAlgorithms = ()=> {
        return $http.get('algorithms/compiled.json')
        .then((response)=> {
            return response.data;
        });
    };
});

app.service('markdownService', function($sce) {
    var toHTML = function(markdownText) {
        return markdown.toHTML(markdownText);
    };
    this.returnMarkdownAsTrustedHTML = function(markdown) {
        if(!markdown) return;
        return $sce.trustAsHtml(toHTML(markdown));
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
    
    var getAlgorithm = function(name) {
        return getAlgorithms()
        .then((algorithms)=> {
            console.log(algorithms);
            return algorithms.filter((item)=>{return item.name==name})[0];
        });
    };
    
    var initialize = ()=> {
        var fuseOptions = {
            shouldSort: true,
            findAllMatches: true,
            includeScore: true,
            includeMatches: true,
            threshold: 0.5,
            maxPatternLength: 32,
            minMatchCharLength: 4,
            keys: [
                {
                    "name": "name",
                    "weight": 1
                },
                {
                    "name": "longName",
                    "weight": 1
                },
                {
                    "name": "tags",
                    "weight": 0.4
                },
                {
                    "name": "description",
                    "weight": 0.1
                }
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
    algorithmService.getAlgorithm = getAlgorithm;
    algorithmService.fuzzySearch = fuzzySearch;
    return algorithmService;
});

app.controller('baseController', function($scope, dataService) {
    
});

app.controller('searchController', function($scope, algorithmService, $location) {
    $scope.initialize = ()=> {
        
    };
    $scope.initialize();
    
    $scope.viewAlgorithm = (algorithm)=> {
        $location.path(`/a/${algorithm.name}`);
    };
    
    $scope.searchTermChange = (searchTerm)=> { 
        $scope.results = algorithmService.fuzzySearch(searchTerm); 
    }; 
    
    // $scope.results = ()=> {
    //     var algorithms = [];
    //     for(var result of algorithmService.fuzzySearch($scope.searchTerm)) {
    //         algorithms.push(result.item);
    //     }
    //     return algorithms;
    // };
});

app.controller('algorithmPageController', function($scope, algorithmService, $location, $routeParams, markdownService) {
    $scope.initialize = ()=> {
        algorithmService.getAlgorithm($routeParams.algorithm)
        .then((algorithm)=> {
            $scope.algorithm = algorithm;
        });
    };
    $scope.initialize();
    
    $scope.noPageMarkdown = "##This algorithm doesn't seem to have a page. \n\nCreate a page.";
    
    $scope.longDescriptionAsHTML = markdownService.returnMarkdownAsTrustedHTML;
    
});

app.controller('404Controller', function($location) {
    $location.path('/');
});