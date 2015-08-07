export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.invitedFriends = [{name: 'Rob'}, {name: 'Unknown'}];
    }]
  };
};