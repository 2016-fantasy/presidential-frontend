import _ from 'lodash';
import HashList from 'hash-list';

export default ['$compile', ($compile) => {
  let currentGraph;

  return {
    restrict: 'E',
    scope: {
      'graph': '=',
    },
    link: ($scope, element, attributes) => {
      $scope.$watch('graph', graph => {
        const visible = {};// careful with this
        $scope.visible = visible;
        $scope.transitionTo = setGraph(graph, visible);
      });

      function setGraph({data, states, start}, visible) {
        const current = {},
              indices = [];

        _.extend($scope, data);

        let currentState = {name: start, state: states[start]};

        setStage(currentState);

        currentGraph = {current, indices, getCurrentState: () => currentState};

        return transitionTo;

        function transitionTo(name) {
          if (currentState && currentState.name === name) return transitionTo;

          const previousState = currentState;

          currentState = getNewState(name);

          setStage(currentState, previousState);

          return transitionTo;

          function getNewState(name) {
            const {name: currentName, state} = currentState,
                  {transitions} = state,
                  canTransition = _.some(transitions, transition => transition === name);

            if (!canTransition) throw Error(`Tried to transition from '${currentName}' to non-existent state ${name}`);

            return {name, state: states[name]};
          }
        }

        function setStage(state, previousState) {
          setClass(state, previousState);
          arrangeElements(state);

          function setClass(state, previousState) {
            if (state) element.addClass('state-' + state.name);
            if (previousState) element.removeClass('state-' + previousState.name);
          }

          function arrangeElements({state}) {
            const {properties} = state,
                  {length} = properties,
                  keys = _.keys(current),
                  present = _.mapValues(current, _ => false);
                  // track = toMap(properties);

            let position = 0;

            while (position < length) {

              position++;
            }

            _.each(properties, setLocation);
            _.each(_.keys(_.pick(present, value => !value)), remove);

            function setLocation(property, position) {
              const info = current[property],
                    update = info ? adjustExisting : insertNew;

              current[property] = update(property, position, info);

              visible[property] = true;
              present[property] = true;

              function adjustExisting(property, position, info) {
                console.log('adjustExisting', {property, position, info});
                const {element: curEl, index} = info,
                      preEl = indices[position - 1];

                setElements(preEl, curEl, element);

                info.index = position;

                // Need to adjust other infos?

                return info;
              }

              function insertNew(property, position) {
                console.log('insertNew', {property, position});
                const newEl = create(property),
                      preEl = indices[position - 1],
                      info = {element: newEl, index: position};

                console.log('inserting', {property, position, newEl, preEl, info});

                setElements(preEl, newEl, element);

                indices.splice(position, 0, newEl);

                console.log('inserted', {property, position, indices, preEl});

                return info;

                function create(p) { return $compile(`<${p} class="${p}" ng-if="visible['${p}']"></${p}>`)($scope); }
              }

              function setElements(preEl, curEl, element) {
                if (preEl) preEl.after(curEl);
                else element.prepend(curEl);
              }
            }

            function remove(property) {
              const info = current[property];


            }


            // _.each(properties, (property, position) => {
            //   const info = current[property];

            //   if (info === undefined) return add(property, position);

            //   const {index} = info;

            //   if (index === position) return;

            //   move(property, position);
            // });

            function add(p, index) {
              const newElement = $compile(`<${p} class="${p}" ng-if="visible['${p}']"></${p}>`)($scope),
                    info = {element: newElement, index};



              current[p] = info;
            }

            function move() {

            }
          }
            // _.each(_.zip(properties, _.map(properties, current.indexOf)), update);

            // function update([property, position], index) {
            //   const newElement = $compile(`<${p} class="${p}" ng-if="visible['${p}']"></${p}>`)($scope);

            //   if (position === -1) {
            //     addAt(index);
            //     current.insertAt(newElement, index);
            //   }
            //   else {
            //     if (index !== position) {
            //       addAt(position);
            //     }
            //   }

            //   function addAt(index) {
            //     const el = current.at(index);

            //     if (el) el.before(newElement);
            //     else element.append(newElement);
            //   }
            // }

            // _.each(
            //     _.zip(
            //       properties,
            //       _.map(properties, current.indexOf)),
            //   ([property, index]) => index === -1 ? makeVisible(property, index) : undefined);

            // function makeVisible(p, index) {
            //   const e = $compile(`<${p} class="${p}" ng-if="visible['${p}']"></${p}>`)($scope);
            //   console.log('makeVisible', {p, index});
            //   console.log({e});

            //   if (index < current.length() - 1)
            //   element.append(e);
            //   current.insertAt(e, index);

            //   visible[p] = true;
            //   track[p] = true;
            // }

            // function makeNotVisible(p) {
            //   console.log('makeNotVisible', {p});
            //   visible[p] = false;
            //   track[p] = true;
            // }

            // console.log('setState', state, properties, track, length);
            // let position = 0;

            // for (let i = 0; i < length; i++) {
            //   const p = properties[position],
            //         index = current.indexOf(p);

            //   console.log({i, index, p});

            //   if (index === -1) {
            //     visible[p] = true;
            //     current.insertAt(p, position);
            //     element.append($compile(`<${p} class="${p}" ng-if="visible['${p}']"></${p}>`)($scope));
            //   }
            //   else {
            //     visible[p] = false;
            //   }

            //   position++;

            //   track[p] = true;
            // }

            // _.each(_.where(track, value => !value), toRemove => {
            //   current.removeById(toRemove);
            // });
            // _.each(_.where(track, value => !value), current.removeById);
          return state;
        }
      }


      // $scope.transitionTo = transitionTo;

      // function transitionTo(state) {
      //   setState(getNewState(state));

      //   function getNewState(state) {
      //     const {graph} = $scope,
      //           {transitions} = currentState,
      //           transition = transitions[state];

      //     if (!transition) throw Error(`Tried to transit to non-existent state ${state}`);

      //     return graph.states[transition];
      //   }
      // }

      // function setGraph(graph) {
      //   const {data, states, start} = graph;

      //   setState(states[start]);
      // }

      // function setState(state) {
      //   const {visible} = $scope,
      //         {properties} = state,
      //         {length} = properties,
      //         track = toMap(properties);

      //   console.log('setState', state, properties, track, length);
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

      //   currentState = state;
      // }

      function toMap(array) {
        return _.transform(array, (result, value) => result[value] = true, {});
      }
    },
    controller: ['$scope', function($scope) {
      console.log('stage controller');
      this.transitionTo = (...args) => $scope.transitionTo(...args);
      this.getCurrentGraph = () => currentGraph;
      this.isCurrentState = guess => currentGraph ? currentGraph.getCurrentState().name === guess : undefined;
      this.getCurrentState = () => currentGraph ? currentGraph.getCurrentState().name : undefined;
    }]
  };
}];