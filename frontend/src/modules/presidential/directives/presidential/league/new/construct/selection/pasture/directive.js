import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      console.log({element});
      const pasture = element[0],
            wrapper = pasture.children[0],
            candidates = wrapper.children[0];

      $scope.setBarPosition = setBarPosition;

      //these should be removed when the directive is destroyed...
      wrapper.addEventListener('resize', () => setBarPosition());
      wrapper.addEventListener('scroll', () => $scope.$apply(setBarPosition));

      //this should also be called while dragging on the bar
      $scope.barClick = $event => {
        // This should be changed to scroll the middle of the screen to the clicked point
        // Currently it will scroll the top of the screen to the clicked point
        const {clientY, target} = $event,
              {clientHeight, offsetTop} = target,
              {scrollHeight} = wrapper;

        const height = clientY - offsetTop,
              location = height / clientHeight,
              top = location * scrollHeight;

        wrapper.scrollTop = top;
      };

      function setBarPosition() {
        const {clientHeight, scrollHeight, scrollTop} = wrapper;

        $scope.barHeight = 100 * (clientHeight / scrollHeight) + '%';
        $scope.barTop = 100 * (scrollTop / scrollHeight) + '%';
      }
    },
    controller: ['$scope', '$timeout', 'dataStore', ($scope, $timeout, dataStore) => {
      const candidates = _.sortBy(_.filter(dataStore.getCandidates(), ({image}) => image !== undefined), 'totalContributions').reverse(),
            show = {},
            hide = {};

      _.extend($scope, {candidates, show, hide});

      $scope.hover = ({fecId}) => show[fecId] = true;
      $scope.unhover = ({fecId}) => delete show[fecId];

      $scope.select = candidate => {
        const {fecId} = candidate;

        hide[fecId] = true;
        $scope.league.stable.unshift(candidate);

        $scope.setBarPosition();
      };

      // Cheating, but it works for now
      $timeout(() => $scope.setBarPosition(), 500);
    }]
  };
};