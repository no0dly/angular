(function () {
  'use strict';

  angular
    .module('myApp', [
        'ngRoute',
        'myApp.customers',
        'myApp.orders',
        // 'myApp.person'
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
(function() {
    angular
        .module('myApp.customers', [])
        .config(configCustomers)
        .run(runCustomers)
        .controller('CustomersCtrl', CustomersCtrl);

    function configCustomers( $routeProvider ) {
        console.log('configCustomers');
        $routeProvider
        .when('/customers', {
            controller: 'CustomersCtrl',
            templateUrl: 'app/customers/customers.html'
        });
    }

    function runCustomers() {
        console.log('runCustomers');
    }

    function CustomersCtrl($scope) {
        console.log('CustomersCtrl');

        new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5373612
            });

            VK.Auth.login(function(response) {
                if(response.session) {
                    resolve(response);
                } else {
                    reject( new Error('не удалось соединиться!') );
                }
            }, 2);
        }).then(function(value) {
            return new Promise(function(resolve, reject) {
                VK.api('friends.get', {'fields': 'photo_100, city', 'v': '5.50'}, function(response) {
                    if( response.error ) {
                        reject( new Error(response.error.error_msg) );
                    } else {
                        resolve(response.response.items);
                    }
                });
            });
        }).then(function(value) {
            $scope.users = value;
            $scope.changeState = function($event, mode) {
                var li = document.querySelectorAll('.costumers-list li');
                for(var i = 0; i < li.length; i++) {
                    li[i].className = "";
                }
                angular.element($event.target.parentNode).addClass('is-active');
                if ( mode === 'line' ) {
                    $scope.state = false;
                } else {
                    $scope.state = true;
                }
                
            };
            $scope.$apply();
        });
    }
}());



(function() {
    angular
        .module('myApp.orders', [])
        .config(configOrders)
        .run(runOrders)
        .controller('OrdersCtrl', OrdersCtrl);

    function configOrders( $routeProvider ) {
        console.log('configOrders');
        $routeProvider
        .when('/orders', {
            controller: 'OrdersCtrl',
            templateUrl: 'app/orders/orders.html'
        });
    }

    function runOrders() {
        console.log('runOrders');
    }

    function OrdersCtrl() {
        console.log('OrdersCtrl');
    }
}());
