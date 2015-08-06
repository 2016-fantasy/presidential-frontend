require('angular');

export default {
  'devbox': angular.module('devbox', [])
    .directive('companionPanel', require('./directives/companionPanel/directive'))

    .factory('keylog', require('./factories/keylog/factory'))
};