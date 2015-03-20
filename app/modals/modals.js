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
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});