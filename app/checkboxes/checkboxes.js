// http://jsfiddle.net/cjwprostar/M4vGj/6/
'use strict';

angular.module('myApp.checkboxes', ['ngRoute'])

// inject object $routeProvider that probably comes from module 'ngRoute'
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checkboxes', {
        templateUrl: 'checkboxes/checkboxes.html',
        controller: 'MainCtrl'
    });
}])

.controller('MainCtrl', ['$scope', function($scope) {
    $scope.model = {
        allEaten: false,
        people: [
            {
                name: "Bob",
                fruits: [
                    { type: 'Apple', eaten: false },
                    { type: 'Banana', eaten: false },
                    { type: 'Pear', eaten: true },
                    { type: 'Tomato', eaten: false },
                    { type: 'Grapefruit', eaten: true },
                ]
            },
            {
                name: "Joe",
                fruits: [
                    { type: 'Apple', eaten: true },
                    { type: 'Banana', eaten: true },
                    { type: 'Pear', eaten: true },
                    { type: 'Tomato', eaten: true },
                    { type: 'Grapefruit', eaten: true },
                ]
            }
        ]
    };
}])

/**
 * Directive for an indeterminate (tri-state) checkbox.
 * Based on the examples at http://stackoverflow.com/questions/12648466/how-can-i-get-angular-js-checkboxes-with-select-unselect-all-functionality-and-i
 */
.directive('indeterminateCheckbox', [function() {
    return {
        // Create a new scope for this directive rather than inheriting the parent scope.
        scope: true,
        // Require that "ngModel" directive be present for this directive to function correctly.
        require: '?ngModel',
        // scope – A scope to be used by the directive.
        // element – An element the directive is bound to (https://docs.angularjs.org/api/ng/function/angular.element)
        // attrs – A list of attributes associated with the element.
        link: function(scope, element, attrs, modelCtrl) {
            var childList = attrs.childList;
            var property = attrs.property;

            // Bind the onChange event to update children
            element.bind('change', function() {
                scope.$apply(function () {
                    var isChecked = element.prop('checked');

                    // Set each child's selected property to the checkbox's checked property
                    angular.forEach(scope.$eval(childList), function(child) {
                        child[property] = isChecked;
                    });
                });
            });

            // Watch the children for changes
            scope.$watch(childList, function(newValue) {
                var hasChecked = false;
                var hasUnchecked = false;

                // Loop through the children
                angular.forEach(newValue, function(child) {
                    if (child[property]) {
                        hasChecked = true;
                    } else {
                        hasUnchecked = true;
                    }
                });

                // Determine which state to put the checkbox in
                if (hasChecked && hasUnchecked) {
                    element.prop('checked', false);
                    element.prop('indeterminate', true);
                    if (modelCtrl) {
                        modelCtrl.$setViewValue(false);
                    }
                } else {
                    element.prop('checked', hasChecked);
                    element.prop('indeterminate', false);
                    if (modelCtrl) {
                        modelCtrl.$setViewValue(hasChecked);
                    }
                }
            }, true);
        }
    };
}])

// http://schlogen.github.io/angular-multi-check/
.directive('multiCheckGroup', function () {
    return {
        scope: {},
        controller: function ($scope) {
            this.getElements = function () {
                var dataMultiCheck = Array.prototype.slice.call($scope.element[0].querySelectorAll('[data-multi-check]'), 0);
                var multiCheck = Array.prototype.slice.call($scope.element[0].querySelectorAll('[multi-check]'), 0);

                return multiCheck.concat(dataMultiCheck);
            };
            this.lastChecked = null;
        },
        link: function (scope, element) {
            scope.element = element;
        }
    };
}).directive('multiCheck', function () {
    return {
        require: ['^ngModel', '^multiCheckGroup'],
        restrict: 'A',
        link: function (scope, el, attrs, controllers) {
            var groupCtrl = controllers[1];

            el.bind('click', function (event) {
                var last = groupCtrl.lastChecked;
                if (last && event.shiftKey) {
                    var chkboxes = groupCtrl.getElements(),
                        start = chkboxes.indexOf(event.target),
                        end = chkboxes.indexOf(last),
                        checked = last.checked;

                    angular.forEach(chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1), function (box) {
                        var model = angular.element(box).data('$ngModelController');

                        console.log(model)

                        model.$setViewValue(checked);
                        model.$render();
                    });
                }
                groupCtrl.lastChecked = event.target;
            });

        }
    };
});