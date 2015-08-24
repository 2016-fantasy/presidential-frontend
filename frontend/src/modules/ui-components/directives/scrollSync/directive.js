export default () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      const expression = attributes['scrollSync'];

      if (expression) {
        element.on('scroll', $event => $scope.$evalAsync(expression, {$event}));
        element.on('touchstart', touchstart);
        element.on('touchend', touchend);
      }

      let isScrolling = false;
      function touchstart() {
        isScrolling = true;

        animate();
      }

      function touchend() {
        isScrolling = false;
      }

      function animate() {
        $scope.$eval(expression, {$event: {target: element[0]}});
        if (isScrolling) window.requestAnimationFrame(animate);
      }
    }
  };
};