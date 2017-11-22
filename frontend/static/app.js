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

app.service('AlgorithmCollection', function() {
   var AlgorithmCollection = class {
       constructor(algorithms) {
           this.algorithms = algorithms;
       }
       getTagCollection() {
            let tags = {};
            for(let algorithm of this.algorithms) {
                for(let tag of algorithm.tags) {
                    if(!tags[tag]) tags[tag] = [];
                    tags[tag].push(algorithm);
                }
            }
            return tags;
       }
       getCountedTags() {
           let tags = this.getTagCollection();
           let countedTags = [];
            for(let tag in tags) {
                countedTags.push({
                    name: tag,
                    algorithms: tags[tag],
                    count: tags[tag].length
                });
            }
            return countedTags.sort((a,b)=>{return b.count-a.count});
       }
       getAlgorithms(...tags) {
           let algorithms = [];
           for(let algorithm of this.algorithms) {
               try {
                   for(let tag of tags) {
                       if(algorithm.tags.indexOf(tag)==-1) throw new Error();
                   }
                   algorithms.push(algorithm);
               }
               catch (e) {
                   
               }
           }
           return algorithms;
       }
       getSubTags(...tags) {
           let algorithms = this.getAlgorithms(...tags);
           return new AlgorithmCollection(algorithms).getCountedTags();
       }
   };
   return AlgorithmCollection;
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
    
    var getAlgorithmByURL = async function(url) {
        let algorithms = await getAlgorithms();
        return algorithms.filter((item)=>{return item.url==url})[0];
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
    algorithmService.getAlgorithmByURL = getAlgorithmByURL;
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
        $location.path(`/a/${algorithm.url}`);
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

app.controller('tagsController', function($scope, algorithmService, AlgorithmCollection, $location) {
    $scope.initialize = async()=> {
        $scope.algorithmCollection = new AlgorithmCollection(await algorithmService.getAlgorithms());
        $scope.tags = $scope.algorithmCollection.getCountedTags();
        $scope.reset();
        $scope.$digest();
        ga('send', {
            hitType: 'pageview',
            page: `/tags`
        });
    };
    
    $scope.selectTag = (tag, reset)=> {
        if(reset) {
            $scope.selectedTags = [];
            $scope.selectedIndex = $scope.tags.findIndex((t)=>{return t.name==tag.name});
        }
        
        if(tag in $scope.selectedTags) return;
        $scope.selectedTags.push(tag.name);
        $scope.refresh();
    };
    $scope.removeTag = (tag)=> {
        if($scope.selectedTags.indexOf(tag)==0) {
            $scope.reset();
        }
        else {
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tag), 1);
            $scope.refresh();
        }
    };
    $scope.reset = ()=> {
        $scope.selectedTags = [];
        $scope.selectedIndex = $scope.tags.length;
    };
    $scope.refresh = ()=> {
        $scope.selectedAlgorithms = $scope.algorithmCollection.getAlgorithms(...$scope.selectedTags);
        
        //Clean this mess
        let totalSubTags = $scope.algorithmCollection.getSubTags(...$scope.selectedTags);
        let nonDupeSubTags = [];
        for(let subTag of totalSubTags) {
            if($scope.selectedTags.indexOf(subTag.name)!=-1) continue;
            nonDupeSubTags.push(subTag);
        }
        $scope.subTags = nonDupeSubTags;
    };
    $scope.viewAlgorithm = (algorithm)=> {
        $location.path(`/a/${algorithm.url}`);
    };
    
    $scope.initialize();
});

app.controller('algorithmPageController', function($scope, $window, algorithmService, $location, $routeParams, markdownService) {
    $scope.initialize = async()=> {
        let algorithm = await algorithmService.getAlgorithmByURL($routeParams.algorithm);
        $scope.algorithm = algorithm;
        $scope.$digest();
        ga('send', {
            hitType: 'pageview',
            page: `/a/${algorithm.url}`
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