export default ['$timeout', $timeout => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      $timeout(() => {
        element.attr('src', $scope.$eval(attributes.delayedSrc));
      }, 750);
    }
  };
}];