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
    }
  };
};