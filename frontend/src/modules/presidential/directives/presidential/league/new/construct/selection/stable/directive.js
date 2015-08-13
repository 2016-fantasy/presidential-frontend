import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      'league': '='
    },
    controller: ['$scope', $scope => {
      $scope.select = candidate => {
        //Should probably show a menu with some options
        const {stable} = $scope.league,
              index = stable.indexOf(candidate);

        if (index >= 0) stable.splice(index, 1);
      };

      $scope.gotoDraft = () => {
        alert('draft');
      };

      $scope.getStableLogSize = () => {
        return Math.ceil(Math.log($scope.league.stable.length));
      };

      $scope.sortBy = by => {
        console.log('sortby', by);

        const {stable} = $scope.league;

        if (by === 'totalContributions') {
          $scope.league.stable = _.sortBy(stable, candidate => candidate.totalContributions || 0).reverse();
        }
        else if (by === 'party') {
          $scope.league.stable = _.sortBy(stable, candidate => candidate.party);
        }
      };

      let offset = 0;
      $scope.candidateWrapperLeft = 0;
      $scope.scroll = $event => {
        const {deltaY} = $event;

        offset += deltaY > 0 ? 50 : -50;

        $scope.candidateWrapperLeft = offset;
      };
    }]
  };
};