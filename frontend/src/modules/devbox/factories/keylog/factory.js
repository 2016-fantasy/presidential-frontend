export default ['$window', $window => {
  const subscribers = [];

  return {
    on(callback) {
      if (subscribers.length === 0) {
        $window.addEventListener('keypress', keypress);
      }

      subscribers.push(callback);

      return () => {
        for (let i = 0; i < subscribers.length; i++) {
          if (subscribers[i] === callback) {
            subscribers.splice(i, 1);
            break;
          }
        }
        if (subscribers.length === 0) $window.removeEventListener('keypress', keypress);
      };
    }
  };

  function keypress(event) {
    subscribers.forEach(callback => callback(event));
  }
}];