'use strict';

angular.module('myApp.version.interpolate-filter', [])

    .filter('interpolateVersion', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }])
    .filter('interpolateBuildVersion', ['build', function (build) {
        return function (text) {
            return String(text).replace(/\%BUILD\%/mg, build);
        };
    }]);
