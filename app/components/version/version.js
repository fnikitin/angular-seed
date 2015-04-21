'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])
    .value('version', '0.1-SNAPSHOT')
    .value('build', '56');
//git rev-list HEAD --count
