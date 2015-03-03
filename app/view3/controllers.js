/**
 * Created by fnikitin on 03/03/15.
 */

// This controller asks for data bind objects
// Angular injects scope and location
function HelloController($scope, $location) {
    $scope.who = { text: 'World' };
}