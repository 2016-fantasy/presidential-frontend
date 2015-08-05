export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    // I'm leaving this here purely as documentation. This directive
    // expects something to set the league attribute to a valid league
    // data structure. Still need to think more about how best to document
    // this...
    // scope: {
    //   league: '='
    // },
    link: ($scope, element, attributes) => {
      console.log({$scope, element, attributes});
    },
    controller: ['$scope', $scope => {

    }]
  };
};