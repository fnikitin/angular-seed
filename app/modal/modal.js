'use strict';

angular.module('myApp.modal', ['ngRoute','ui.bootstrap','dialogs'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/modal', {
            templateUrl: 'modal/modal.html',
            controller: 'ModalCtrl'
        });
    }])

    .controller('ModalCtrl', [function() {

    }]);
