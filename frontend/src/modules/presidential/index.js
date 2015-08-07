require('angular');
require('angular-animate');
require('angular-route');

import _ from 'lodash';

import dataStore from '../dataStore';
import devbox from '../devbox';

export default {
  'presidential':  angular.module('presidential', ['ngRoute', 'ngAnimate', 'dataStore', 'devbox'])
    .directive('presidential',  require('./directives/presidential/directive'))
      .directive('candidates', require('./directives/presidential/candidates/directive'))

      // These names are a bit nuanced and not well documented...
      .directive('league',       require('./directives/presidential/league/directive'))
      .directive('newLeague',    require('./directives/presidential/league/new/directive'))
        .directive('construct',  require('./directives/presidential/league/new/construct/directive'))
          .directive('selection',require('./directives/presidential/league/new/construct/selection/directive'))
            .directive('pasture',require('./directives/presidential/league/new/construct/selection/pasture/directive'))
            .directive('stable', require('./directives/presidential/league/new/construct/selection/stable/directive'))
          .directive('draft',    require('./directives/presidential/league/new/construct/draft/directive'))
        .directive('sidebar',    require('./directives/presidential/league/new/sidebar/directive'))
          .directive('players',  require('./directives/presidential/league/new/sidebar/players/directive'))
            .directive('invite', require('./directives/presidential/league/new/sidebar/players/invite/directive'))
      .directive('findLeague',   require('./directives/presidential/league/find/directive'))

      .directive('welcome',      require('./directives/presidential/welcome/directive'))

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

      const routerController = [
        '$scope', '$routeParams',
        ($scope, $routeParams) => _.extend($scope, $routeParams)
      ];

      // Allows you to wire a route to a specific item in a database.
      // Currently, this is equivalent to grabbing a value from a
      // key-value store based on a user provided parameter in the URL
      const dataController = [
        '$scope', '$routeParams', 'dataStore',
        ($scope, $routeParams, dataStore) => {
          const something = _.reduce($routeParams, (params, value, name) => {
            const [store, index] = name.match(/(\b|[A-Z]+)[a-z]*/g);

            console.log({name, value, store, index});

            params[store] = dataStore[`get${capitalize(store)}By${index}`](value);

            return params;
          }, {});

          console.log({$scope, dataStore, something});

          _.extend($scope, something);

          function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        }
      ];

      $routeProvider
        .when('/', {
          template: '<welcome></welcome>'
        })
        .when('/candidates', {
          template: '<candidates><candidates>'
        })
        .when('/league/new', {
          template: '<new-league></new-league>'
        })
        .when('/league/find', {
          template: '<find-league></find-league>'
        })
        .when('/league/:leagueId', {
          template: '<league></league>',
          controller: dataController
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