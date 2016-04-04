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
