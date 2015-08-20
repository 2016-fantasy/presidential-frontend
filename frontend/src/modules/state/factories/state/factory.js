export default () => {
  return s => {
    const states = s.slice(0), // Clone the array because we don't trust anyone not to change it (though we may want to support that feature)
          map = _.transform(states, (result, state, index) => (result[state] = index)),
          state = {};

    return {
      setState,
      // get state() { return state; }
      state
    };

    function setState(newState) {
      const {current} = state;

      if (current) element.removeClass(`state-${current}`);

      state.previous = current;
      state.current = newState;

      element.addClass(`state-${newState}`);
    }
  };
};
