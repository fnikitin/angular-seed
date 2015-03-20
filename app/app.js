'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.view3',
        'myApp.cart',
        'myApp.checkboxes',
        'myApp.version',
        'myApp.modal'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
