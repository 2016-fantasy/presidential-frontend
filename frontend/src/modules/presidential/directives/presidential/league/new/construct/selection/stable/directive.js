import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    require: '^stage',

    link($scope, element, attributes, stage) {

      $scope.select = candidate => {
        //Should probably show a menu with some options
        const {stable} = $scope.league,
              index = stable.indexOf(candidate);

        if (index >= 0) stable.splice(index, 1);
        if (stable.length  === 0) stage.transitionTo('pasture');
      };

      $scope.toggleDraft = () => {
        if (stage.isCurrentState('set-draft')) stage.transitionTo('stable');
        else stage.transitionTo('set-draft');
      };

    },

    controller: ['$scope', ($scope) => {
      const {draft, league} = $scope;

      if (draft) attachDraft(draft);
      else setDraftText();

      $scope.$watch('draft', attachDraft); // This should be wrapped with something that will deregister it on $destroy or when a new value is set

      function attachDraft(draft) { if (draft) draft.when('countdown', setDraftText); }

      function setDraftText(countdown) { $scope.draftText = format(countdown) || 'Set Draft'; }
      function format(countdownString) { return countdownString; }

      $scope.scroll = $event => {
        console.log({$event});
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

        setOffset(0);
      };

      let offset = 0;
      $scope.candidateWrapperLeft = 0;
      $scope.scroll = $event => {
        const {deltaY} = $event;

        setOffset(offset + deltaY > 0 ? 50 : -50);
      };

      function setOffset(o) {
        offset = o;
        $scope.candidateWrapperLeft = offset;
      }
    }]
  };
};