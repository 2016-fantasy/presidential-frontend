require('angular');

export default {
  'dataStore': angular.module('dataStore', [])
    .factory('dataStore', require('./factories/dataStore/factory'))
};