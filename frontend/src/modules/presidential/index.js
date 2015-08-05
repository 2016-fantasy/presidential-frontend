require('angular');
require('angular-route');

export default {
  'presidential':  angular.module('presidential', ['ngRoute'])
    .directive('presidential',  require('./directives/presidential/directive'))
      .directive('welcome',     require('./directives/presidential/welcome/directive'))

    .config([
      '$routeProvider', '$locationProvider', /*'$mountProvider',*/
      ($routeProvider, $locationProvider/*, $mountProvider*/) => {

      // All of the commented code here is from another project.
      // It might be useful here so I'm going to leave it for now

      // console.log('routes');

      // const {directive} = $mountProvider;

      // const routes = {
      //   [directive]: 'exerciseList',
      //   '/exercise': {
      //     [directive]: 'exerciseList',
      //     '/:name?': {
      //       [directive]: 'exercise'
      //     }
      //   }
      // };

      // $mountProvider.mount('/', routes);
      // $mountProvider.$get();

      // const routerController = [
      //   '$scope', '$routeParams',
      //   ($scope, $routeParams) => _.extend($scope, $routeParams)
      // ];

      // const dataController = [
      //   '$scope', '$routeParams', 'dataStore',
      //   ($scope, $routeParams, dataStore) => {
      //     const something = _.reduce($routeParams, (params, value, name) => {
      //       const [store, index] = name.match(/(\b|[A-Z]+)[a-z]*/g);

      //       console.log({name, value, store, index});

      //       params[store] = dataStore[`get${capitalize(store)}By${index}`](value);

      //       return params;
      //     }, {});

      //     console.log({dataStore, something});

      //     _.extend($scope, something);

      //     function capitalize(string) {
      //       return string.charAt(0).toUpperCase() + string.slice(1);
      //     }
      //   }
      // ];

      $routeProvider
        .when('/', {
          template: '<welcome></welcome>'
        })
        // .when('/breathe', {
        //   template: `<breathe></breathe>`
        // })
        // .when('/exercise/:exerciseId?/:taskName?', {
        //   template: '<player exercise="exercise"></player>',
        //   controller: dataController
        // })
        // .when('/freestyle', {
        //   template: '<freestyle></freestyle>'
        // })
        // .when('/workout/:workoutName?/:exerciseIndex?/:taskIndex?', {
        //   template: params => {
        //     const {workoutName, exerciseIndex, taskIndex} = params;
        //     if (!workoutName) {
        //       return '<workout-list></workout-list>';
        //     }
        //     else return '<workout workout-name="{{workoutName}}" exercise-index="{{exerciseIndex}}" task-index="{{taskIndex}}"></workout>';
        //   },
        //   controller: routerController
        // })
        .otherwise({
          template: 'Where\'d you come from?'
        });
    }])
};