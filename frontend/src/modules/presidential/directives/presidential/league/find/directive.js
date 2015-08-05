export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      $scope.leagues = dataStore.getLeagues(); //Yeah, this will fail horribly at scale... fix it
    }]
  };
};