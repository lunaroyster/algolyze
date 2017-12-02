/* global angular Fuse markdown ga */

var app = angular.module("algolyze", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/', {
        controller  : 'homeController',
        templateUrl : './views/home.html'
    })
    
    .when('/a/:algorithm', {
        controller  : 'algorithmPageController',
        templateUrl : './views/algorithmPage.html'
    })
    
    .when('/tags', {
        controller  : 'tagsController',
        templateUrl : './views/tags.html'
    })
    
    .when('/list', {
        controller  : 'listController',
        templateUrl : './views/list.html'
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

app.factory('algorithmService', function(dataService, AlgorithmCollection, $q) {
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
    
    var getAlgorithmMasterCollection = async function() {
        return new AlgorithmCollection(await getAlgorithms());
    };
    
    var getGlobalTagList = async()=> {
        return Object.getOwnPropertyNames((await getAlgorithmMasterCollection()).getTagCollection());
    };
    var getAlgorithmTagVectors = async()=> {
        let algTagVectors = {};
        let algorithms = await getAlgorithms();
        let globalTagList = await getGlobalTagList();
        for(let algorithm of algorithms) {
            let tagList = [];
            for(let tag of globalTagList) {
                if(algorithm.tags.indexOf(tag)!=-1) {
                    tagList.push(1);
                }
                else {
                    tagList.push(0);
                }
            }
            algTagVectors[algorithm.name] = tagList;
        }
        return algTagVectors;
    };
    var getSimilarAlgorithms = async(name)=> {
        let algorithmTagVectors = await getAlgorithmTagVectors();
        let algorithms = await getAlgorithms();
        let contextAlg = await getAlgorithm(name);
        var cosineSimilarity = (A, B)=> {
            let dotProduct = (a, b)=> {
                if(a.length!=b.length) throw Error("Bad vector");
                let sum = 0;
                for(let i = 0; i<a.length; i++) {
                    sum+=(a[i]*b[i]);
                }
                return sum;
            };
            let magnitude = (a)=> {
                let squareSum = 0;
                for(let i of a) {
                    squareSum+=i**2;
                }
                return squareSum**0.5
            };
            let AdotB = dotProduct(A, B);
            let Amag = magnitude(A);
            let Bmag = magnitude(B);
            return AdotB/(Amag*Bmag);
        };
        let similarities = {};
        for(let algorithmTagVector in algorithmTagVectors) {
            if(name==algorithmTagVector) continue;
            similarities[algorithmTagVector] = (cosineSimilarity(algorithmTagVectors[name], algorithmTagVectors[algorithmTagVector]))
        }
        return similarities;
    }
    
    var fuzzySearch = function(term) {
        return algorithmService.fuse.search(term);
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
        let algorithmList = await getAlgorithms();
        var fuse = new Fuse(algorithmList, fuseOptions);
        algorithmService.fuse = fuse;
    };
    initialize();
    
    algorithmService.getAlgorithms = getAlgorithms;
    algorithmService.getAlgorithm = getAlgorithm;
    algorithmService.getAlgorithmByURL = getAlgorithmByURL;
    algorithmService.fuzzySearch = fuzzySearch;
    algorithmService.getAlgorithmMasterCollection = getAlgorithmMasterCollection;
    algorithmService.getSimilarAlgorithms = getSimilarAlgorithms;
    return algorithmService;
});

app.controller('baseController', function($scope, dataService) {
    $scope.outboundClick = (event)=> {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: event.target.href
        });
    };
});

app.controller('homeController', function($scope, algorithmService, $location, $rootScope) {
    $scope.initialize = ()=> {
        // $rootScope.title = "algolyze: Search";
        $rootScope.title = undefined;
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

app.controller('tagsController', function($scope, algorithmService, $location, $rootScope) {
    $scope.initialize = async()=> {
        $rootScope.title = "algolyze: Tags";
        $scope.algorithmCollection = await algorithmService.getAlgorithmMasterCollection();
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

app.controller('listController', function($scope, algorithmService, $rootScope) {
    $scope.initialize = async()=> {
        $rootScope.title = "algolyze: List";
        $scope.algorithms = await algorithmService.getAlgorithms();
        $scope.$digest();
        ga('send', {
            hitType: 'pageview',
            page: `/list`
        });
    };
    
    $scope.initialize();
});

app.controller('algorithmPageController', function($scope, $window, algorithmService, $location, $routeParams, markdownService, $rootScope) {
    $scope.initialize = async()=> {
        let algorithm = await algorithmService.getAlgorithmByURL($routeParams.algorithm);
        let similarAlgorithms = await algorithmService.getSimilarAlgorithms(algorithm.name);
        $scope.similarAlgorithms = (Object.keys(similarAlgorithms).sort((a,b)=> {return similarAlgorithms[b]-similarAlgorithms[a]}));
        $rootScope.title = `algolyze: ${algorithm.name}`;
        $scope.algorithm = algorithm;
        $rootScope.$digest();
        $scope.$digest();
        ga('send', {
            hitType: 'pageview',
            page: `/a/${algorithm.url}`
        });
        
    };
    $scope.initialize();
    
    $scope.viewExternalLink = (link)=> {
        $window.open(link.url, "_blank");
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: link
        });
    };
    $scope.viewAlgorithm = async(algorithmName)=> {
        let algorithm = await algorithmService.getAlgorithm(algorithmName)
        $location.path(`/a/${algorithm.url}`);
        $rootScope.$digest();
    };
    
    $scope.noPageMarkdown = "##This algorithm doesn't seem to have a page. \n\nCreate a page.";
    
    $scope.longDescriptionAsHTML = markdownService.returnMarkdownAsTrustedHTML;
    
});

app.controller('404Controller', function($location) {
    $location.path('/');
});
