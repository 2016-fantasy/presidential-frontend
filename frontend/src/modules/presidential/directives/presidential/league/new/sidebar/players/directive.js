export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.players = [{name: 'Blake'},{name: 'Rob'}];
    }]
  };
};