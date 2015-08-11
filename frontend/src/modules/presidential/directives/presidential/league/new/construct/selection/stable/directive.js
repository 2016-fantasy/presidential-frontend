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

      let offset = 0;
      $scope.candidateWrapperLeft = 0;
      $scope.scroll = $event => {
        const {deltaY} = $event;

        offset += deltaY > 0 ? 50 : -50;

        $scope.candidateWrapperLeft = offset;
      };
    }]
  };
};