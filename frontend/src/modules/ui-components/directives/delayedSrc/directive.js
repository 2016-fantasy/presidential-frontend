const delay = 0;

export default ['$timeout', $timeout => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      if (delay > 0) {
        $timeout(() => {
          element.attr('src', $scope.$eval(attributes.delayedSrc));
        }, delay);
      }
      else {
        element.attr('src', $scope.$eval(attributes.delayedSrc));
      }
    }
  };
}];