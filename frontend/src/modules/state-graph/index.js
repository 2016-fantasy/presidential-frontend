require('angular');

export default {
  'state-graph': angular.module('stateGraph', [])
    .directive('stage', require('./directives/stage/directive'))
};