require('angular');

export default {
  'ui-components': angular.module('uiComponents', [])
    .directive('delayedSrc',          require('./directives/delayedSrc/directive'))
    .directive('scroll',          require('./directives/scroll/directive'))
    .directive('scrollControl',   require('./directives/scroll-control/directive'))
};