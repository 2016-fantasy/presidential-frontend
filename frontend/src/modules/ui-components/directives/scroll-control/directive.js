import _ from 'lodash';

export default () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      const expression = attributes['scrollControl'];
      control(element, {}, (...arg) => $scope.$evalAsync(expression, ...arg));
    },
    controller: ['$scope', $scope => {
    }]
  };
};

function control(element, bounds, notify) {
  const data = {position: {x: 0, y: 0}, velocity: {}},
        {position, velocity, touch} = data,
        lastUpdate = new Date().getTime();

  _.each({
    wheel,
    touchstart,
    touchend,
    touchmove
  }, (fn, name) => element.on(name, event => set(fn(event))));

  function set(v) {
    velocity.x = v.x;
    velocity.y = v.y;

    animate();
  }

  const friction = 1 - 0.05,
        threshold = 0.001;
  function animate() {
    const now = new Date().getTime(),
          dt = Math.max(now - lastUpdate, 1000) / 1000;

    position.x += dt * velocity.x;
    position.y += dt * velocity.y;

    velocity.x *= friction;
    velocity.y *= friction;

    const magnitude2 = velocity.x * velocity.x + velocity.y * velocity.y;
    if (magnitude2 > threshold) {
      window.requestAnimationFrame(animate);
    }

    notify({velocity, position});
  }

  function wheel(event) {
    const {deltaX, deltaY} = event;

    let x = deltaX > 0 ? 1 : -1,
        y = deltaY > 0 ? 1 : -1;

    return {x, y};
  }

  function touchstart({touches}) {
    touch.touches = touches;
    touch.metrics = {};
    touch.time = new Date().getTime();
  }

  function touchend(event) {
    // TODO: Continue emitting events if we have velocity?! :)
    delete touch.touches;
  }

  function touchmove({changedTouches}) {
    const {metrics, time} = touch,
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

    // notify({$event: {isTouch: true, deltaY: -netY, deltaX: netX}});

    event.preventDefault();
    event.stopPropagation();

    return {x: netX, y: netY};
  }
}