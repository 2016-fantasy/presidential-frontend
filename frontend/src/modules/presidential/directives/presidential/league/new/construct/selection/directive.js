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

const states = {
  'candidate-tier': ['candidate-tier'],
  'stable': ['stable', 'candidate-tier'],
  'set-draft': ['set-draft', 'stable'],
  'invite': ['set-draft', 'invite', 'stable'],
  'pre-game': ['pre-game', 'stable'],
  'countdown': ['countdown', 'stable'],
  'draft': ['stable', 'draft']
};
const a = `
states {
  candidate-tier:
     : [candidate-tier]
    -> stable
  stable:
     : [stable, candidate-tier]
    -> candidate-tier
    -> set-draft
  set-draft:
     : [set-draft, stable]
    -> stable
    -> invite
  invite:
     : [invite, stable]
    -> set-draft
    -> pre-game
  pre-game:
     : [pre-game, stable]
    -> countdown
    -> draft
  countdown:
     : [countdown, stable]
    -> draft
  draft:
     : [stable, draft]
    -> game
  game:
     : [game]
}`;

const b = parse(a);

console.log({b});

function parse(string) { // a terrible parser
  const lines = string.split('\n'),
        states = {};

  let state;

  for (let i = 2; i < lines.length - 1; i++) { // skip the first two and last lines
    const line = lines[i].trim(),
          {length} = line;

    if (line.lastIndexOf(':') === length - 1) { // new state
      const [name] = line.split(':');

      state = states[name];

      if (state) throw Error(`Duplicate state ${name}`);

      state = states[name] = {
        values: [],
        transitions: []
      };
    }
    else if (line.indexOf(':') === 0) { // state property
      const list = line.split(':')[1],
            values = /\[(.*)\]/g.exec(list)[1].split(',').map(value => value.trim());

      state.values.push(...values);
    }
    else if (line.indexOf('->') === 0) { // transition
      const transition = line.split('->')[1].trim();

      state.transitions.push(transition);
    }

  }

  return states;
}

// states = {
//   'candidate-tier': {
//     values: ['candidate-tier'],
//     transitions: ['stable']
//   },
//   'stable': {
//     values: ['stable', 'candidate-tier'],
//     transitions: ['candidate-tier', 'set-draft']
//   },
//   'set-draft': {
//     values: ['set-draft', 'stable'],
//     transitions: ['stable', 'invite']
//   }
// };