export default () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      const expression = attributes['mousewheel'];

      element.on('mousewheel', event => {
        // This should probably be turned into an angular event? (is there such a thing?)
        $scope.$eval(expression, {$event: event});
      });
    }
  };
};