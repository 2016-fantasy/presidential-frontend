require('angular');

export default {
  'ui-components': angular.module('uiComponents', [])
    .directive('mousewheel',  require('./directives/mousewheel/directive'))
};