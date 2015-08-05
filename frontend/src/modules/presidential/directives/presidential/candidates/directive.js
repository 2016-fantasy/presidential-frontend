export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      $scope.candidates = dataStore.getCandidates();

      console.log({$scope});
    }]
  };
};