export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      // This was tool-generated elsewhere
      $scope.stageGraph = {
         "presidential-frontend": {
            "name": "presidential-frontend",
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
            "start": "candidate-tier",
            "states": {
               "candidate-tier": {
                  "properties": [
                     "candidate-tier"
                  ],
                  "transitions": [
                     "stable"
                  ]
               },
               "stable": {
                  "properties": [
                     "stable",
                     "candidate-tier"
                  ],
                  "transitions": [
                     "candidate-tier",
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
      }['new-league'];
    }]
  };
};