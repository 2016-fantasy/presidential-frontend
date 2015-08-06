import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      const candidates = dataStore.getCandidates(),
            parties = dataStore.getParties();

      const candidateFilter = {};

      _.extend($scope, {candidates, parties, candidateFilter});

      $scope.setParty = party => {
        candidateFilter.party = party.name;
        $scope.selectedCandidate = undefined;
      };

      $scope.setCandidate = candidate => {
        $scope.selectedCandidate = candidate;
      };
    }]
  };
};