export default () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      const expression = attributes['scroll'];

      s(element, arg => $scope.$evalAsync(expression, arg));

      // element.on('wheel', event => {
      //   // This should probably be turned into an angular event? (is there such a thing?)
      //   $scope.$evalAsync(expression, {$event: event});
      // });

      // let touch = {};
      // element.on('touchstart', ({touches}) => {
      //   touch.touches = touches;
      //   touch.metrics = {};
      //   touch.time = new Date().getTime();
      // });

      // element.on('touchend', event => {
      //   // Continue emitting events if we have velocity?! :)
      //   delete touch.touches;
      // });

      // element.on('touchmove', event => {
      //   const {changedTouches} = event,

      //         {metrics, time} = touch,
      //         now = new Date().getTime(),
      //         dt = now - time;

      //   let netX = 0,
      //       netY = 0;

      //   for (let i = 0; i < changedTouches.length; i++) {
      //     const {identifier, pageX: x, pageY: y} = changedTouches[i],
      //           metric = (metrics[identifier] = metrics[identifier] || {velocity: {x: 0, y: 0}, position: {}}),
      //           {velocity, position} = metric,
      //           {x: oldX, y: oldY} = position;

      //     position.x = x;
      //     position.y = y;

      //     let vx = (x - oldX) / dt,
      //         vy = (y - oldY) / dt;

      //     velocity.x = vx;
      //     velocity.y = vy;

      //     netX += vx;
      //     netY += vy;
      //   }

      //   $scope.$evalAsync(expression, {$event: {isTouch: true, deltaY: -netY, deltaX: netX}});

      //   event.preventDefault();
      //   event.stopPropagation();
      // });
    }
  };
};

function s(element, notify) {
  element.on('wheel', event => notify({$event: event}));

  let touch = {};
  element.on('touchstart', ({touches}) => {
    touch.touches = touches;
    touch.metrics = {};
    touch.time = new Date().getTime();
  });

  element.on('touchend', event => {
    // Continue emitting events if we have velocity?! :)
    delete touch.touches;
  });

  element.on('touchmove', event => {
    const {changedTouches} = event,

          {metrics, time} = touch,
          now = new Date().getTime(),
          dt = now - time;

    let netX = 0,
        netY = 0;

    for (let i = 0; i < changedTouches.length; i++) {
      const {identifier, pageX: x, pageY: y} = changedTouches[i],
            metric = (metrics[identifier] = metrics[identifier] || {velocity: {x: 0, y: 0}, position: {}}),
            {velocity, position} = metric,
            {x: oldX, y: oldY} = position;

      position.x = x;
      position.y = y;

      let vx = (x - oldX) / dt,
          vy = (y - oldY) / dt;

      velocity.x = vx;
      velocity.y = vy;

      netX += vx;
      netY += vy;
    }

    notify({$event: {isTouch: true, deltaY: -netY, deltaX: netX}});

    event.preventDefault();
    event.stopPropagation();
  });
}