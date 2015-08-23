import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      const scrollCapture = element[0],
            pasture = scrollCapture.children[0],
            wrapper = pasture.children[0],
            innerWrapper = wrapper.children[0],
            candidates = innerWrapper.children[0];

      $scope.setMaskPosition = setMaskPosition;

      //these should be removed when the directive is destroyed...
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

      //this should also be called while dragging on the bar
      $scope.barClick = $event => {
        // This should be changed to scroll the middle of the screen to the clicked point
        // Currently it will scroll the top of the screen to the clicked point
        const {offsetY, target} = $event, // Is this (offsetY) cross browser?
              {clientHeight, offsetHeight, offsetTop} = target,
              {scrollHeight} = wrapper;

        const height = offsetY,
              location = height / clientHeight,
              top = location * scrollHeight;

        wrapper.scrollTop = top;

        setLocation(location);
      };

      $scope.scroll = (position, velocity) => {
        const {y} = position,
              {clientHeight} = candidates;

        setLocation(y / clientHeight);
      };

      let location = 0,
          offset = 0;
      function setLocation(value) {
        const {clientHeight} = candidates;

        location = clamp(0, value, 1);

        setOffset(location * clientHeight);
      }

      function setOffset(value) {
        const {clientHeight} = candidates;

        offset = clamp(0, value, clientHeight);

        setCandidatesPosition();
        setMaskPosition();
      }

      function setCandidatesPosition() {
        $scope.candidatesTop = -offset;
      }

      function setMaskPosition() {
        const visible = wrapper.clientHeight / candidates.clientHeight;

        const top = Math.max(location, 0),
              bottom = Math.max(1 - top - visible, 0);

        $scope.topMaskHeight = top ;
        $scope.topMaskTop = 0;
        $scope.bottomMaskHeight = bottom ;
        $scope.bottomMaskTop = (1 - bottom);
      }

      // function setMaskPosition(top) {
      //   const {clientHeight, scrollHeight, scrollTop} = candidates;

      //   const visibleProportion = Math.min(scrollHeight - scrollTop, clientHeight) / scrollHeight,
      //         topProportion = scrollTop / scrollHeight,
      //         bottomProportion = 1 - topProportion - visibleProportion;

      //   $scope.topMaskHeight = topProportion * 100;
      //   $scope.topMaskTop = 0;
      //   $scope.bottomMaskHeight = bottomProportion * 100;
      //   $scope.bottomMaskTop = (1 - bottomProportion) * 100;


      //   $scope.barHeight = 100 * (clientHeight / scrollHeight) + '%';
      //   $scope.barTop = 100 * (scrollTop / scrollHeight) + '%';
      // }

      function setBarPosition() {
        const {clientHeight, scrollHeight, scrollTop} = candidates;

        const visibleProportion = Math.min(scrollHeight - scrollTop, clientHeight) / scrollHeight,
              topProportion = scrollTop / scrollHeight,
              bottomProportion = 1 - topProportion - visibleProportion;

        $scope.topMaskHeight = topProportion * 100;
        $scope.topMaskTop = 0;
        $scope.bottomMaskHeight = bottomProportion * 100;
        $scope.bottomMaskTop = (1 - bottomProportion) * 100;


        $scope.barHeight = 100 * (clientHeight / scrollHeight) + '%';
        $scope.barTop = 100 * (scrollTop / scrollHeight) + '%';
      }
    },
    controller: ['$scope', '$timeout', 'dataStore', ($scope, $timeout, dataStore) => {
      // const candidates = _.sortBy(_.filter(dataStore.getCandidates(), ({image}) => image !== undefined), 'totalContributions').reverse(),
      const candidates = _.sortBy(dataStore.getCandidates(), ({totalContributions}) => totalContributions || 0).reverse(),
            show = {},
            tapped = {};

      $timeout(() => _.extend($scope, {candidates, show, tapped}), 0);

      $scope.hover = ({fecId}) => show[fecId] = true;
      $scope.unhover = ({fecId}) => delete show[fecId];

      $scope.select = candidate => {
        const {fecId} = candidate,
              isTapped = tapped[fecId];

        if (!isTapped) {
          $scope.league.stable.unshift(candidate);
          $scope.setState('stable');
        }
        else {
          const {league: {stable}} = $scope,
                index = stable.indexOf(candidate);

          if (index >= 0) stable.splice(index, 1);

          if (stable.length === 0) $scope.setState('candidate-tier');
        }

        tapped[fecId] = !isTapped;

        $scope.setMaskPosition();
      };

      // Cheating, but it works for now
      $timeout(() => $scope.setMaskPosition(), 500);
    }]
  };
};

function clamp(min, value, max) { return Math.min(Math.max(value, min), max); }