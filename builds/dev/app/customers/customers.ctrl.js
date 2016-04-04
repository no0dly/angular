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
                VK.api('friends.get', {'fields': 'photo_100'}, function(response) {
                    if( response.error ) {
                        reject( new Error(response.error.error_msg) );
                    } else {
                        resolve(response.response);
                    }
                });
            });
        }).then(function(value) {
            $scope.users = value;
            $scope.$apply();
        });
    }
}());
