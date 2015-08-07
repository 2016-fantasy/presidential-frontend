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
    }]
  };
};