(function () {
  'use strict';

  angular
    .module('myApp', [
        'ngRoute',
        'myApp.customers',
        'myApp.orders',
        'myApp.customers.person'
    ])
    .config(configMyApp)
    .run(runMyApp)
    .controller('AppCtrl', AppCtrl)
    .controller('HomeCtrl', HomeCtrl);

    function configMyApp($routeProvider, $locationProvider) {
        console.log('configMyApp');
        $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'app/home/home.html'
        })
        .otherwise({redirectTo: '/home'});

        // $locationProvider.html5Mode(true);
    }

    function runMyApp() {
        console.log('runMyApp');
    }

    function HomeCtrl($scope, $location) {

    }

    function AppCtrl($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();