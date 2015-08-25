import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', '$interval', 'dataStore', ($scope, $interval, dataStore) => {
      const draft = dataStore.getDraft();

      $scope.start = dateAdd(new Date(), 'minute', 5);

      setCountdown();
      $interval(setCountdown, 1000);

      function setCountdown() {
        const now = new Date().getTime(),
              {start} = $scope,
              left = start - now;

        $scope.countdown = timeToString(left);
        draft.set('countdown', $scope.countdown);
      }

      function setStart(start) {
        const now = new Date().getTime(),
              left = start - now;

        // if (left < )
      }
    }]
  };
};

//http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}

function timeToString(time) {
  let secondsTotal = time / 1000,
      [minutesTotal, seconds] = [secondsTotal / 60, Math.floor(secondsTotal % 60)],
      [hoursTotal, minutes] = [minutesTotal / 60, Math.floor(minutesTotal % 60)],
      [daysTotal, hours] = [hoursTotal / 24, Math.floor(hoursTotal % 24)],
      [years, days] = [Math.floor(daysTotal / 365), Math.floor(daysTotal % 365)]; // won't handle leap years

  return _.compact(
          [
            years > 0 ? `${years} years` : undefined,
            days > 0 ? `${days} days` : undefined,
            hours > 0 ? `${hours} hours` : undefined,
            minutes > 0 ? `${minutes} minutes` : undefined,
            seconds > 0 ? `${seconds} seconds` : undefined
          ]
         ).join(' ');
}