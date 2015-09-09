import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      $scope.dataStore = dataStore;

      // This was tool-generated elsewhere
      $scope.stageGraph = injectData({
         "presidential-frontend": {
            "name": "presidential-frontend",
            "start": "teaser",
            "states": {
               "teaser": {
                  "properties": [
                     "teaser"
                  ],
                  "transitions": [
                     "intro"
                  ]
               },
               "intro": {
                  "properties": [
                     "intro"
                  ],
                  "transitions": [
                     "choose"
                  ]
               },
               "choose": {
                  "properties": [
                     "choose"
                  ],
                  "transitions": [
                     "new-league",
                     "existing-league"
                  ]
               }
            }
         },
         "new-league": {
            "name": "new-league",
            "data": [
               "league"
            ],
            "start": "pasture",
            "states": {
               "pasture": {
                  "properties": [
                     "pasture"
                  ],
                  "transitions": [
                     "stable"
                  ]
               },
               "stable": {
                  "properties": [
                     "stable",
                     "pasture"
                  ],
                  "transitions": [
                     "pasture",
                     "set-draft"
                  ]
               },
               "set-draft": {
                  "properties": [
                     "set-draft",
                     "stable"
                  ],
                  "transitions": [
                     "stable",
                     "invite"
                  ]
               },
               "invite": {
                  "properties": [
                     "invite",
                     "stable"
                  ],
                  "transitions": [
                     "set-draft",
                     "pre-game"
                  ]
               },
               "pre-game": {
                  "properties": [
                     "pre-game",
                     "stable"
                  ],
                  "transitions": [
                     "countdown",
                     "draft"
                  ]
               },
               "countdown": {
                  "properties": [
                     "countdown",
                     "stable"
                  ],
                  "transitions": [
                     "draft"
                  ]
               },
               "draft": {
                  "properties": [
                     "stable",
                     "draft"
                  ],
                  "transitions": [
                     "game"
                  ]
               },
               "game": {
                  "properties": [
                     "game"
                  ],
                  "transitions": []
               }
            }
         },
         "existing-league": {
            "name": "existing-league",
            "start": "selector",
            "states": {
               "selector": {
                  "properties": [
                     "selector"
                  ],
                  "transitions": [
                     "choose",
                     "random"
                  ]
               }
            }
         }
      }['new-league'], dataStore);
    }]
  };
};

function injectData(graph, dataStore) {
  return _.mapValues(graph, (value, name) => {
    console.log({name, value});
    if (name === 'data') {
      return _.reduce(value, (result, name) => {
        result[name] = dataStore.create(name);
        return result;
      }, {});
    }

    return value;
  });
}