'use strict';

// https://angular-ui.github.io/bootstrap/
angular.module('myApp.modals', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/modals', {
            templateUrl: 'modals/modals.html',
            controller: 'ModalDemoCtrl'
        });
    }])

.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        // The open method returns a modal instance, an object with the following properties:
        // * close(result) - a method that can be used to close a modal, passing a result
        // * dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
        // * result - a promise that is resolved when a modal is closed and rejected when a modal is dismissed
        // * opened - a promise that is resolved when a modal gets opened after downloading content's template and resolving all variables
        var modalInstance = $modal.open({
            // A path to a template representing modal's content
            templateUrl: 'modals/modal.html',
            // A controller for a modal instance - it can initialize scope used by modal.
            // accepts the "controller-as" syntax in the form 'SomeCtrl as myctrl'; can be injected with $modalInstance
            controller: 'ModalInstanceCtrl',
            // Optional size of modal window. Allowed values: 'sm' (small) or 'lg' (large)
            size: size,
            // Members that will be resolved and passed to the controller as locals; it is equivalent
            // of the resolve property for AngularJS routes
            resolve: {
                // inject items into ModalInstanceCtrl
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(

            // function to be executed when the promise is fulfilled
            function (selectedItem) {
                $log.info(selectedItem, " has been selected");
                $scope.selected = selectedItem;
            },
            // function to be executed when the promise is rejected
            function (reason) {
                $log.info(reason, ': modal dismissed at ' + new Date());
            }
        );
    };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        // select 1st item by default
        item: $scope.items[0]
    };

    $scope.ok = function () {
        // promise is fulfilled with given items
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        // promise is rejected with the reason 'cancel'
        $modalInstance.dismiss('cancel');
    };
});