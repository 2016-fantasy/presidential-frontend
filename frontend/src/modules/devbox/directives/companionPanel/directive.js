export default ['keylog', keylog => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      keylog.on(event => {
        console.log({event});
        const {keyCode, ctrlKey, shiftKey} = event;

        if (ctrlKey && shiftKey && keyCode === 1) $scope.$apply(() => $scope.isVisible = !$scope.isVisible);
      });
      // $window.addEventListener('keypress', function() { console.log({arguments}); });
    },
    controller: ['$scope', $scope => {
      $scope.close = () => $scope.isVisible = false;
    }]
  };
}];