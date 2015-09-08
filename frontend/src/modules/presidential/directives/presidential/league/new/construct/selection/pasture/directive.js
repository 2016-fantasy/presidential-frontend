import _ from 'lodash';

export default ['$timeout', $timeout => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    require: '^stage',
    link: ($scope, element, attributes, stage) => {
      const scrollCapture = element[0],
            pasture = scrollCapture.children[0],
            wrapper = pasture.children[0],
            innerWrapper = wrapper.children[0],
            candidates = innerWrapper.children[0];

      $scope.setMaskPosition = setMaskPosition;

      window.addEventListener('resize', resize);
      scrollCapture.addEventListener('resize', resize);
      wrapper.addEventListener('resize', resize);
      wrapper.addEventListener('scroll', resize);

      $scope.$on('$destroy', () => {
        wrapper.removeEventListener('scroll', resize);
        wrapper.removeEventListener('resize', resize);
        scrollCapture.removeEventListener('resize', resize);
        window.removeEventListener('resize', resize);
      });

      function resize() {
        $scope.$apply(setMaskPosition);
      }

      $scope.barClick = $event => {
        const {offsetY, target} = $event, // Is this (offsetY) cross browser?
              {clientHeight, offsetHeight, offsetTop} = target,
              {scrollHeight} = innerWrapper;

        const height = offsetY,
              location = height / clientHeight,
              top = location * scrollHeight;

        innerWrapper.scrollTop = top;
      };

      $scope.syncMask = $event => {
        const {target} = $event,
              {clientHeight, scrollHeight, scrollTop} = target,
              location = scrollTop / scrollHeight,
              visible = clientHeight / scrollHeight;

        const top = Math.max(location, 0),
              bottom = Math.max(1 - top - visible, 0);

        $scope.topMaskHeight = top ;
        $scope.topMaskTop = 0;
        $scope.bottomMaskHeight = bottom ;
        $scope.bottomMaskTop = (1 - bottom);
      };

      function setMaskPosition() {
        const {clientHeight, scrollHeight, scrollTop} = innerWrapper,
              visible = clientHeight / scrollHeight,
              location = scrollTop / scrollHeight;

        const top = Math.max(location, 0),
              bottom = Math.max(1 - top - visible, 0);

        $scope.topMaskHeight = top ;
        $scope.topMaskTop = 0;
        $scope.bottomMaskHeight = bottom ;
        $scope.bottomMaskTop = (1 - bottom);
      }

      $scope.select = candidate => {
        console.log({$scope});
        const {show, tapped, league: {stable}} = $scope,
              {id} = candidate,
              isTapped = tapped[id];

        tapped[id] = !isTapped;

        if (!isTapped) {
          show[id] = false;
          // $timeout(() => {
            const {league: {stable}} = $scope;

            stable.unshift(candidate);
            // $scope.setState('stable');
            stage.transitionTo('stable');
          // }, 0);
        }
        else {
          const index = stable.indexOf(candidate);

          if (index >= 0) stable.splice(index, 1);

          if (stable.length === 0) stage.transitionTo('pasture');
        }
      };
    },
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      const candidates = _.sortBy(dataStore.getCandidates(), ({totalContributions}) => totalContributions || 0).reverse(),
            show = {},
            tapped = {};

      $timeout(() => _.extend($scope, {candidates, show, tapped}), 0);

      $scope.hover = ({id}) => show[id] = true;
      $scope.unhover = ({id}) => delete show[id];

      // Cheating, but it works for now
      $timeout(() => $scope.setMaskPosition(), 500);
    }]
  };
}];

function clamp(min, value, max) { return Math.min(Math.max(value, min), max); }