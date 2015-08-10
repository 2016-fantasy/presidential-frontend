require('angular');

export default {
  'ui-components': angular.module('uiComponents', [])
    .directive('scroll',  require('./directives/scroll/directive'))
};