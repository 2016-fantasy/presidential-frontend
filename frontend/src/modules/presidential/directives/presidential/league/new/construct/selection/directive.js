import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      const states = [
        'candidate-tier',
        'stable',
        'set-draft',
        'invite',
        'pre-game',
        'countdown',
        'draft'
      ];

      const stateMap = _.transform(states, (result, state, index) => (result[state] = index));

      $scope.setState = state => {
        const {currentState} = $scope;

        if (currentState) element.removeClass(`state-${currentState}`);
        element.addClass(`state-${state}`);

        $scope.currentState = state;
      };

      $scope.setState(states[0]);

      $scope.setState = state => {
        const {currentState} = $scope;

        if (currentState) element.removeClass(`state-${currentState}`);
        element.addClass(`state-${state}`);

        $scope.currentState = state;
      };

      $scope.isState = state => $scope.currentState === state;
    }
  };
};

function state(s) {
  const states = s.slice(0), // Clone the array because we don't trust anyone not to change it (though we may want to support that feature)
        map = _.transform(states, (result, state, index) => (result[state] = index));

  return state => {

  };
}