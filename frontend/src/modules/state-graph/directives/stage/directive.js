export default ['$compile', ($compile) => {
  return {
    restrict: 'E',
    link: ($scope, element, attributes) => {
      element.parent().append($compile('<div>wut wut</div>')($scope));
    },
    controller: ['$scope', $scope => {

    }]
  };
}];