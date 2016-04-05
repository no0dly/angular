(function() {
    angular
    .module('myApp.customers.person', [])
    .config(configCustomersPerson)
    .controller('CustomersPersonCtrl', CustomersPersonCtrl);

    function configCustomersPerson() {
        
    }

    function CustomersPersonCtrl( $scope, $filter, $routeParams ) {
        var person = $filter('filter')(customers, {'id': $routeParams.id});
        $scope.person = person[0];
    }
}());