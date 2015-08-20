require('angular');

export default {
  'state': angular.module('state', [])
    .factory('state', require('./factories/state/factory'))
};