var coffice = angular.module('coffice',['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');

    $routeProvider
    .when('/', {
        templateUrl: 'views/modules/app/Home.html',
        controller: 'HomeCtrl',
    })
    .otherwise({redirectTo: '/'});

}]);