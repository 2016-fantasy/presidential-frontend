export default() => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      'league': '='
    },
    controller: ['$scope', $scope => {
      $scope.select = candidate => {
        //Should probably show a menu with some options
      };

      $scope.gotoDraft = () => {
        alert('draft');
      };

      $scope.getStableLogSize = () => {
        return Math.ceil(Math.log($scope.league.stable.length));
      };
    }]
  };
};