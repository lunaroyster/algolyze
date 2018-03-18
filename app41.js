'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global angular Fuse markdown ga */

var app = angular.module("algolyze", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: './views/home.html'
    }).when('/a/:algorithm', {
        controller: 'algorithmPageController',
        templateUrl: './views/algorithmPage.html'
    }).when('/tags', {
        controller: 'tagsController',
        templateUrl: './views/tags.html'
    }).when('/list', {
        controller: 'listController',
        templateUrl: './views/list.html'
    }).otherwise({
        controller: '404Controller',
        templateUrl: './views/404.html'
    });

    $locationProvider.html5Mode({
        enabled: true,
        hashPrefix: ''
    });
}]);

app.service('dataService', function ($http) {
    var _this = this;

    this.fetchAlgorithms = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return $http.get('algorithms/compiled.json');

                    case 2:
                        response = _context.sent;
                        return _context.abrupt('return', response.data);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));
});

app.service('markdownService', function ($sce) {
    var toHTML = function toHTML(markdownText) {
        return markdown.toHTML(markdownText);
    };
    this.returnMarkdownAsTrustedHTML = function (markdown) {
        if (!markdown) return;
        return $sce.trustAsHtml(toHTML(markdown));
    };
});

app.service('AlgorithmCollection', function () {
    var AlgorithmCollection = function () {
        function AlgorithmCollection(algorithms) {
            _classCallCheck(this, AlgorithmCollection);

            this.algorithms = algorithms;
        }

        _createClass(AlgorithmCollection, [{
            key: 'getTagCollection',
            value: function getTagCollection() {
                var tags = {};
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.algorithms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var algorithm = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = algorithm.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var tag = _step2.value;

                                if (!tags[tag]) tags[tag] = [];
                                tags[tag].push(algorithm);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return tags;
            }
        }, {
            key: 'getCountedTags',
            value: function getCountedTags() {
                var tags = this.getTagCollection();
                var countedTags = [];
                for (var tag in tags) {
                    countedTags.push({
                        name: tag,
                        algorithms: tags[tag],
                        count: tags[tag].length
                    });
                }
                return countedTags.sort(function (a, b) {
                    return b.count - a.count;
                });
            }
        }, {
            key: 'getAlgorithms',
            value: function getAlgorithms() {
                var algorithms = [];

                for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
                    tags[_key] = arguments[_key];
                }

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.algorithms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var algorithm = _step3.value;

                        try {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = tags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var tag = _step4.value;

                                    if (algorithm.tags.indexOf(tag) == -1) throw new Error();
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }

                            algorithms.push(algorithm);
                        } catch (e) {}
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return algorithms;
            }
        }, {
            key: 'getSubTags',
            value: function getSubTags() {
                var algorithms = this.getAlgorithms.apply(this, arguments);
                return new AlgorithmCollection(algorithms).getCountedTags();
            }
        }]);

        return AlgorithmCollection;
    }();
    return AlgorithmCollection;
});

app.factory('algorithmService', function (dataService, AlgorithmCollection, $q) {
    var _this2 = this;

    var algorithmService = {};
    var algorithmList = undefined;

    var getAlgorithms = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!algorithmList) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt('return', algorithmList);

                        case 2:
                            _context2.next = 4;
                            return dataService.fetchAlgorithms();

                        case 4:
                            algorithmList = _context2.sent;
                            return _context2.abrupt('return', algorithmList);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function getAlgorithms() {
            return _ref2.apply(this, arguments);
        };
    }();
    var getAlgorithm = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
            var algorithms;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return getAlgorithms();

                        case 2:
                            algorithms = _context3.sent;
                            return _context3.abrupt('return', algorithms.filter(function (item) {
                                return item.name == name;
                            })[0]);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function getAlgorithm(_x) {
            return _ref3.apply(this, arguments);
        };
    }();
    var getAlgorithmByURL = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
            var algorithms;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return getAlgorithms();

                        case 2:
                            algorithms = _context4.sent;
                            return _context4.abrupt('return', algorithms.filter(function (item) {
                                return item.url == url;
                            })[0]);

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        return function getAlgorithmByURL(_x2) {
            return _ref4.apply(this, arguments);
        };
    }();

    var getAlgorithmMasterCollection = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.t0 = AlgorithmCollection;
                            _context5.next = 3;
                            return getAlgorithms();

                        case 3:
                            _context5.t1 = _context5.sent;
                            return _context5.abrupt('return', new _context5.t0(_context5.t1));

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function getAlgorithmMasterCollection() {
            return _ref5.apply(this, arguments);
        };
    }();

    var getGlobalTagList = function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.t0 = Object;
                            _context6.next = 3;
                            return getAlgorithmMasterCollection();

                        case 3:
                            _context6.t1 = _context6.sent.getTagCollection();
                            return _context6.abrupt('return', _context6.t0.getOwnPropertyNames.call(_context6.t0, _context6.t1));

                        case 5:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this2);
        }));

        return function getGlobalTagList() {
            return _ref6.apply(this, arguments);
        };
    }();
    var getAlgorithmTagVectors = function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var algTagVectors, algorithms, globalTagList, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, algorithm, tagList, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, tag;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            algTagVectors = {};
                            _context7.next = 3;
                            return getAlgorithms();

                        case 3:
                            algorithms = _context7.sent;
                            _context7.next = 6;
                            return getGlobalTagList();

                        case 6:
                            globalTagList = _context7.sent;
                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            _context7.prev = 10;
                            _iterator5 = algorithms[Symbol.iterator]();

                        case 12:
                            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                _context7.next = 38;
                                break;
                            }

                            algorithm = _step5.value;
                            tagList = [];
                            _iteratorNormalCompletion6 = true;
                            _didIteratorError6 = false;
                            _iteratorError6 = undefined;
                            _context7.prev = 18;

                            for (_iterator6 = globalTagList[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                tag = _step6.value;

                                if (algorithm.tags.indexOf(tag) != -1) {
                                    tagList.push(1);
                                } else {
                                    tagList.push(0);
                                }
                            }
                            _context7.next = 26;
                            break;

                        case 22:
                            _context7.prev = 22;
                            _context7.t0 = _context7['catch'](18);
                            _didIteratorError6 = true;
                            _iteratorError6 = _context7.t0;

                        case 26:
                            _context7.prev = 26;
                            _context7.prev = 27;

                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }

                        case 29:
                            _context7.prev = 29;

                            if (!_didIteratorError6) {
                                _context7.next = 32;
                                break;
                            }

                            throw _iteratorError6;

                        case 32:
                            return _context7.finish(29);

                        case 33:
                            return _context7.finish(26);

                        case 34:
                            algTagVectors[algorithm.name] = tagList;

                        case 35:
                            _iteratorNormalCompletion5 = true;
                            _context7.next = 12;
                            break;

                        case 38:
                            _context7.next = 44;
                            break;

                        case 40:
                            _context7.prev = 40;
                            _context7.t1 = _context7['catch'](10);
                            _didIteratorError5 = true;
                            _iteratorError5 = _context7.t1;

                        case 44:
                            _context7.prev = 44;
                            _context7.prev = 45;

                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }

                        case 47:
                            _context7.prev = 47;

                            if (!_didIteratorError5) {
                                _context7.next = 50;
                                break;
                            }

                            throw _iteratorError5;

                        case 50:
                            return _context7.finish(47);

                        case 51:
                            return _context7.finish(44);

                        case 52:
                            return _context7.abrupt('return', algTagVectors);

                        case 53:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this2, [[10, 40, 44, 52], [18, 22, 26, 34], [27,, 29, 33], [45,, 47, 51]]);
        }));

        return function getAlgorithmTagVectors() {
            return _ref7.apply(this, arguments);
        };
    }();
    var getSimilarAlgorithms = function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(name) {
            var algorithmTagVectors, algorithms, contextAlg, cosineSimilarity, similarities, algorithmTagVector;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return getAlgorithmTagVectors();

                        case 2:
                            algorithmTagVectors = _context8.sent;
                            _context8.next = 5;
                            return getAlgorithms();

                        case 5:
                            algorithms = _context8.sent;
                            _context8.next = 8;
                            return getAlgorithm(name);

                        case 8:
                            contextAlg = _context8.sent;

                            cosineSimilarity = function cosineSimilarity(A, B) {
                                var dotProduct = function dotProduct(a, b) {
                                    if (a.length != b.length) throw Error("Bad vector");
                                    var sum = 0;
                                    for (var i = 0; i < a.length; i++) {
                                        sum += a[i] * b[i];
                                    }
                                    return sum;
                                };
                                var magnitude = function magnitude(a) {
                                    var squareSum = 0;
                                    var _iteratorNormalCompletion7 = true;
                                    var _didIteratorError7 = false;
                                    var _iteratorError7 = undefined;

                                    try {
                                        for (var _iterator7 = a[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                            var i = _step7.value;

                                            squareSum += Math.pow(i, 2);
                                        }
                                    } catch (err) {
                                        _didIteratorError7 = true;
                                        _iteratorError7 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                                _iterator7.return();
                                            }
                                        } finally {
                                            if (_didIteratorError7) {
                                                throw _iteratorError7;
                                            }
                                        }
                                    }

                                    return Math.pow(squareSum, 0.5);
                                };
                                var AdotB = dotProduct(A, B);
                                var Amag = magnitude(A);
                                var Bmag = magnitude(B);
                                return AdotB / (Amag * Bmag);
                            };

                            similarities = {};
                            _context8.t0 = regeneratorRuntime.keys(algorithmTagVectors);

                        case 12:
                            if ((_context8.t1 = _context8.t0()).done) {
                                _context8.next = 19;
                                break;
                            }

                            algorithmTagVector = _context8.t1.value;

                            if (!(name == algorithmTagVector)) {
                                _context8.next = 16;
                                break;
                            }

                            return _context8.abrupt('continue', 12);

                        case 16:
                            similarities[algorithmTagVector] = cosineSimilarity(algorithmTagVectors[name], algorithmTagVectors[algorithmTagVector]);
                            _context8.next = 12;
                            break;

                        case 19:
                            return _context8.abrupt('return', similarities);

                        case 20:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this2);
        }));

        return function getSimilarAlgorithms(_x3) {
            return _ref8.apply(this, arguments);
        };
    }();

    var fuzzySearch = function fuzzySearch(term) {
        return algorithmService.fuse.search(term);
    };

    var initialize = function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var fuseOptions, algorithmList, fuse;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            fuseOptions = {
                                shouldSort: true,
                                findAllMatches: true,
                                includeScore: true,
                                includeMatches: true,
                                threshold: 0.5,
                                maxPatternLength: 32,
                                minMatchCharLength: 4,
                                keys: [{
                                    "name": "name",
                                    "weight": 1
                                }, {
                                    "name": "longName",
                                    "weight": 1
                                }, {
                                    "name": "tags",
                                    "weight": 0.4
                                }, {
                                    "name": "description",
                                    "weight": 0.1
                                }]
                            };
                            _context9.next = 3;
                            return getAlgorithms();

                        case 3:
                            algorithmList = _context9.sent;
                            fuse = new Fuse(algorithmList, fuseOptions);

                            algorithmService.fuse = fuse;

                        case 6:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this2);
        }));

        return function initialize() {
            return _ref9.apply(this, arguments);
        };
    }();
    initialize();

    algorithmService.getAlgorithms = getAlgorithms;
    algorithmService.getAlgorithm = getAlgorithm;
    algorithmService.getAlgorithmByURL = getAlgorithmByURL;
    algorithmService.fuzzySearch = fuzzySearch;
    algorithmService.getAlgorithmMasterCollection = getAlgorithmMasterCollection;
    algorithmService.getSimilarAlgorithms = getSimilarAlgorithms;
    return algorithmService;
});

app.controller('baseController', function ($scope, dataService) {
    $scope.outboundClick = function (event) {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: event.target.href
        });
    };
});

app.controller('homeController', function ($scope, algorithmService, $location, $rootScope) {
    $scope.initialize = function () {
        // $rootScope.title = "algolyze: Search";
        $rootScope.title = undefined;
    };
    $scope.initialize();

    $scope.viewAlgorithm = function (algorithm) {
        $location.path(`/a/${algorithm.url}`);
    };

    $scope.searchTermChange = function (searchTerm) {
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

app.controller('tagsController', function ($scope, algorithmService, $location, $rootScope) {
    var _this3 = this;

    $scope.initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var tagName, tag;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        $rootScope.title = "algolyze: Tags";
                        _context10.next = 3;
                        return algorithmService.getAlgorithmMasterCollection();

                    case 3:
                        $scope.algorithmCollection = _context10.sent;

                        $scope.tags = $scope.algorithmCollection.getCountedTags();
                        $scope.reset();
                        tagName = $location.search().tag;

                        if (!tagName) {
                            _context10.next = 12;
                            break;
                        }

                        tag = $scope.tags.find(function (t) {
                            return t.name == tagName;
                        });

                        if (tag) {
                            _context10.next = 11;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 11:
                        $scope.selectTag(tag, true);

                    case 12:
                        $scope.$digest();
                        ga('send', {
                            hitType: 'pageview',
                            page: `/tags`
                        });

                    case 14:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, _this3);
    }));

    $scope.selectTag = function (tag, reset) {
        if (reset) {
            $scope.selectedTags = [];
            $scope.selectedIndex = $scope.tags.findIndex(function (t) {
                return t.name == tag.name;
            });
        }

        if (tag in $scope.selectedTags) return;
        $scope.selectedTags.push(tag.name);
        $scope.refresh();
    };
    $scope.removeTag = function (tag) {
        if ($scope.selectedTags.indexOf(tag) == 0) {
            $scope.reset();
        } else {
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tag), 1);
            $scope.refresh();
        }
    };
    $scope.reset = function () {
        $scope.selectedTags = [];
        $scope.selectedIndex = $scope.tags.length;
    };
    $scope.refresh = function () {
        var _$scope$algorithmColl, _$scope$algorithmColl2;

        $scope.selectedAlgorithms = (_$scope$algorithmColl = $scope.algorithmCollection).getAlgorithms.apply(_$scope$algorithmColl, _toConsumableArray($scope.selectedTags));

        //Clean this mess
        var totalSubTags = (_$scope$algorithmColl2 = $scope.algorithmCollection).getSubTags.apply(_$scope$algorithmColl2, _toConsumableArray($scope.selectedTags));
        var nonDupeSubTags = [];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = totalSubTags[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var subTag = _step8.value;

                if ($scope.selectedTags.indexOf(subTag.name) != -1) continue;
                nonDupeSubTags.push(subTag);
            }
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }

        $scope.subTags = nonDupeSubTags;
    };
    $scope.viewAlgorithm = function (algorithm) {
        $location.path(`/a/${algorithm.url}`);
    };

    $scope.initialize();
});

app.controller('listController', function ($scope, algorithmService, $rootScope) {
    var _this4 = this;

    $scope.initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        $rootScope.title = "algolyze: List";
                        _context11.next = 3;
                        return algorithmService.getAlgorithms();

                    case 3:
                        $scope.algorithms = _context11.sent;

                        $scope.$digest();
                        ga('send', {
                            hitType: 'pageview',
                            page: `/list`
                        });

                    case 6:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, _this4);
    }));

    $scope.initialize();
});

app.controller('algorithmPageController', function ($scope, $window, algorithmService, $location, $routeParams, markdownService, $rootScope) {
    var _this5 = this;

    $scope.initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var algorithm;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.next = 2;
                        return algorithmService.getAlgorithmByURL($routeParams.algorithm);

                    case 2:
                        algorithm = _context12.sent;
                        _context12.next = 5;
                        return algorithmService.getSimilarAlgorithms(algorithm.name);

                    case 5:
                        $scope.similarAlgorithms = _context12.sent;

                        $scope.similarAlgorithmNames = Object.keys($scope.similarAlgorithms).sort(function (a, b) {
                            return $scope.similarAlgorithms[b] - $scope.similarAlgorithms[a];
                        });
                        $rootScope.title = `algolyze: ${algorithm.name}`;
                        $scope.algorithm = algorithm;
                        $(".similarAlgorithms").draggable({ axis: "x" });
                        $rootScope.$digest();
                        $scope.$digest();
                        ga('send', {
                            hitType: 'pageview',
                            page: `/a/${algorithm.url}`
                        });

                    case 13:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, _this5);
    }));
    $scope.initialize();

    $scope.getAlgorithmStyle = function (name) {
        return { "border-color": `rgba(255, 255, 255, ${$scope.similarAlgorithms[name]}` };
    };

    $scope.viewExternalLink = function (link) {
        $window.open(link.url, "_blank");
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: link
        });
    };
    $scope.viewAlgorithm = function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(algorithmName) {
            var algorithm;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            _context13.next = 2;
                            return algorithmService.getAlgorithm(algorithmName);

                        case 2:
                            algorithm = _context13.sent;

                            $location.path(`/a/${algorithm.url}`);
                            $rootScope.$digest();

                        case 5:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this5);
        }));

        return function (_x4) {
            return _ref13.apply(this, arguments);
        };
    }();
    $scope.viewTag = function (tagName) {
        $location.path(`/tags`).search('tag', tagName);
    };
    $scope.noPageMarkdown = "##This algorithm doesn't seem to have a page. \n\nCreate a page.";

    $scope.longDescriptionAsHTML = markdownService.returnMarkdownAsTrustedHTML;
});

app.controller('404Controller', function ($location) {
    $location.path('/');
});