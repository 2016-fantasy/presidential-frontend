export default ['keylog', keylog => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      keylog.on(event => {
        const {keyCode, ctrlKey, shiftKey} = event;

        if (ctrlKey && shiftKey && keyCode === 1) {
          $scope.$apply(() => {
            $scope.initialized = true;
            $scope.isVisible = !$scope.isVisible;
          });
        }
      });
    },
    controller: ['$scope', $scope => {
      $scope.close = () => $scope.isVisible = false;
    }]
  };
}];