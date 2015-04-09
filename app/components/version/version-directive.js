'use strict';

angular.module('myApp.version.version-directive', [])

    // version.js injected here as param
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('appBuildVersion', ['build', function (build) {
        return function (scope, elm, attrs) {
            elm.text(build);
        };
    }]);
