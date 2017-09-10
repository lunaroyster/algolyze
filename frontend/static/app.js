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
    
});

app.controller('homeController', function($scope) {
    
});

app.controller('searchController', function($scope) {
    $scope.results = [];
});
