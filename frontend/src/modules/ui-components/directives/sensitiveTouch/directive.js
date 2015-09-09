export default () => {
  return {
    restrict: 'A',
    link($scope, element, attributes) {
      element.on('mousedown', event => {
        const start = event,
              {clientX: x, clientY: y} = start,
              status = {displacement: {absolute: [0,0], relative: [0, 0]}, velocity: [0,0]};

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        function mousemove(event) {
          const {displacement, velocity} = status,
                {absolute, relative} = displacement,
                {clientX, clientY} = event;

          absolute[0] = x - clientX;
          absolute[1] = y - clientY;

          relative[0] = absolute[0] / element[0].clientWidth;
          relative[1] = absolute[1] / element[0].clientHeight;

          console.log({relative});

          notify(status);
        }

        function mouseup(event) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
        }
      });

      function notify(event) {
        const {sensitiveTouch} = attributes;

        if (sensitiveTouch) $scope.$evalAsync(sensitiveTouch, {$event: event});
      }
    }
  };
};