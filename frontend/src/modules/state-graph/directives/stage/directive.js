import _ from 'lodash';
import HashList from 'hash-list';

export default ['$compile', ($compile) => {
  return {
    restrict: 'E',
    scope: {
      'graph': '='
    },
    link: ($scope, element, attributes) => {
      $scope.visible = {};

      const current = new HashList();

      let currentState;

      $scope.$watch('graph', ({states, start}) => setState(states[start]));

      // element.parent().append($compile('<div>wut wut</div>')($scope));
      // setStage();

      // function setStage() {
      //   console.log({$scope});
      //   const {graph, visible} = $scope,
      //         {properties} = graph,
      //         track = _.transform(properties, ({name}) => false),
      //         {length} = properties;

      //   let position = 0;

      //   for (let i = 0; i < length; i++) {
      //     const p = properties[position],
      //           index = current.indexOf(p);

      //     console.log({i, index, p});

      //     if (index === -1) {
      //       visible[p] = true;
      //       current.insertAt(p, position);
      //       element.append($compile(`<${p} ng-if="visible['${p}']"></${p}>`)($scope));
      //     }
      //     else {
      //       visible[p] = false;
      //     }

      //     position++;

      //     track[p] = true;
      //   }

      //   // _.each(_.where(track, value => !value), toRemove => {
      //   //   current.removeById(toRemove);
      //   // });
      //   _.each(_.where(track, value => !value), current.removeById);
      // }

      function transitionTo(state) {
        setState(getNewState(state));

        function getNewState(state) {
          const {graph} = $scope,
                {transitions} = currentState,
                transition = transitions[state];

          if (!transition) throw Error(`Tried to transition to non-existent state ${state}`);

          return graph.states[transition];
        }
      }

      function setState(state) {
        const {visible} = $scope,
              {properties} = state,
              {length} = properties,
              track = toMap(properties);

        console.log('setState', state, properties, track, length);
        let position = 0;

        for (let i = 0; i < length; i++) {
          const p = properties[position],
                index = current.indexOf(p);

          console.log({i, index, p});

          if (index === -1) {
            visible[p] = true;
            current.insertAt(p, position);
            element.append($compile(`<${p} ng-if="visible['${p}']"></${p}>`)($scope));
          }
          else {
            visible[p] = false;
          }

          position++;

          track[p] = true;
        }

        // _.each(_.where(track, value => !value), toRemove => {
        //   current.removeById(toRemove);
        // });
        _.each(_.where(track, value => !value), current.removeById);

        currentState = state;
      }

      function toMap(array) {
        return _.transform(array, (result, value) => result[value] = true, {});
      }
    },
    controller: ['$scope', $scope => {

    }]
  };
}];