/* global angular Fuse markdown ga */

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
    
    .when('/tags', {
        controller  : 'tagsController',
        templateUrl : './views/tags.html'
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
    this.fetchAlgorithms = async()=> {
        let response = await $http.get('algorithms/compiled.json');
        return response.data;
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

app.service('TagCollection', function() {
    var TagCollection = class {
        constructor(algorithmList) {
            this.algorithmList = algorithmList;
        }
        getTags() {
            let tags = {};
            for(let algorithm of this.algorithmList) {
                for(let tag of algorithm.tags) {
                    if(!tags[tag]) tags[tag] = [];
                    tags[tag].push(algorithm);
                }
            }
            return tags;
        }
    };
    return TagCollection;
});

app.factory('algorithmService', function(dataService, $q) {
    var algorithmService = {};
    var algorithmList = undefined;
    
    var getAlgorithms = async function() {
        if(algorithmList) return algorithmList;
        algorithmList = await dataService.fetchAlgorithms();
        return algorithmList;
    };
    
    var getAlgorithm = async function(name) {
        let algorithms = await getAlgorithms();
        return algorithms.filter((item)=>{return item.name==name})[0];
    };
    
    var initialize = async()=> {
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
        let algorithmList = await getAlgorithms()
        var fuse = new Fuse(algorithmList, fuseOptions);
        algorithmService.fuse = fuse;
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

app.controller('tagsController', function($scope, algorithmService, TagCollection) {
    $scope.initialize = async()=> {
        let processedTagCollection = $scope.processTags(await algorithmService.getAlgorithms());
        $scope.tags = processedTagCollection.sort((a,b)=>{return b.count-a.count});
        $scope.pretags = $scope.tags;
        $scope.$digest();
    };
    
    $scope.displayTag = (tag)=> {
        let selectedIndex = $scope.tags.findIndex((t)=>{return t.name==tag.name});
        $scope.pretags = $scope.tags.slice(0, selectedIndex);
        $scope.selectedTag = $scope.tags[selectedIndex];
        $scope.posttags = $scope.tags.slice(selectedIndex+1);
        $scope.selectedProcessedTags = $scope.processTags($scope.selectedTag.algorithms);
        console.log($scope.selectedProcessedTags);
    };
    
    $scope.processTags = (algorithms)=> {
        let tagCollection = new TagCollection(algorithms).getTags();
        let processedTagCollection = [];
        for(let tag in tagCollection) {
            processedTagCollection.push({
                name: tag,
                algorithms: tagCollection[tag],
                count: tagCollection[tag].length
            });
        }
        return processedTagCollection.sort((a,b)=>{return b.count-a.count});
    };
    
    $scope.initialize();
});

app.controller('algorithmPageController', function($scope, $window, algorithmService, $location, $routeParams, markdownService) {
    $scope.initialize = async()=> {
        let algorithm = await algorithmService.getAlgorithm($routeParams.algorithm);
        $scope.algorithm = algorithm;
        $scope.$digest();
        ga('send', {
            hitType: 'pageview',
            page: `/a/${algorithm.name}`
        });
    };
    $scope.initialize();
    
    $scope.viewExternalLink = (link)=> {
        $window.open(link.url, "_blank");
    };
    
    $scope.noPageMarkdown = "##This algorithm doesn't seem to have a page. \n\nCreate a page.";
    
    $scope.longDescriptionAsHTML = markdownService.returnMarkdownAsTrustedHTML;
    
});

app.controller('404Controller', function($location) {
    $location.path('/');
});