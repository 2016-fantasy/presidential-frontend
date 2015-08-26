import _ from 'lodash';

export default () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', '$interval', 'dataStore', ($scope, $interval, dataStore) => {
      const draft = dataStore.getDraft();

      if (draft.countdown === undefined) draft.set('startTime', dateAdd(new Date(), 'minute', 5));

      draft.when('countdown', countdown => $scope.countdown = countdown);

      // const interval = $interval(setCountdown, 1000);

      // $scope.start = dateAdd(new Date(), 'minute', 5);
      // setCountdown();

      // $scope.$on('$destroy', () => $interval.cancel(interval));

      // function setCountdown() {
      //   const now = new Date().getTime(),
      //         {start} = $scope,
      //         left = start - now;

      //   $scope.countdown = timeToString(left);
      //   // $scope.counddown = parseTime(left);
      //   console.log('time', parseTime(left));
      //   draft.set('countdown', $scope.countdown);
      // }

      // function setStart(start) {
      //   const now = new Date().getTime(),
      //         left = start - now;

      //   // if (left < )
      // }
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

//More of an artwork. Can be shortened with some functional magic, this might be faster though
//Benchmark it yourself and report the results.
function timeToString(time) {
  let secondsTotal = time / 1000,
      [minutesTotal, seconds] = [secondsTotal / 60,           Math.floor(secondsTotal % 60)],
        [hoursTotal, minutes] = [minutesTotal / 60,           Math.floor(minutesTotal % 60)],
         [daysTotal,   hours] = [hoursTotal / 24,             Math.floor(hoursTotal % 24)],
             [years,    days] = [Math.floor(daysTotal / 365), Math.floor(daysTotal % 365)]; // won't handle leap years

  return _.compact(
          [
              years > 1 ? `${years} years` :      years > 0 ? `${years} year` : undefined,
               days > 1 ? `${days} days`   :       days > 0 ? `${days} day` : undefined,
              hours > 1 ? `${hours} hours` :      hours > 0 ? `${hours} hour` : undefined,
            minutes > 1 ? `${minutes} minutes` :minutes > 0 ? `${minutes} minute` : undefined,
            seconds > 1 ? `${seconds} seconds` :seconds > 0 ? `${seconds} second` : undefined
          ]
         ).join(' ');
}

function parseTime(time) {
  const secondsTotal = time / 1000,
      [minutesTotal, seconds] = [secondsTotal / 60, Math.floor(secondsTotal % 60)],
      [hoursTotal, minutes] = [minutesTotal / 60, Math.floor(minutesTotal % 60)],
      [daysTotal, hours] = [hoursTotal / 24, Math.floor(hoursTotal % 24)],
      [years, days] = [Math.floor(daysTotal / 365), Math.floor(daysTotal % 365)], // won't handle leap years
      showYears = years > 0,
      showDays = days > 0 || showYears,
      showHours = hours > 0 || showDays,
      showMinutes = minutes > 0 || showHours,
      showSeconds = seconds > 0 || showMinutes;

  return _.compact([
    showYears   ? (  years === 1 ? [`${years}`,     'year'] : [`${years}`,     'years']) : undefined,
    showDays    ? (   days === 1 ? [`${days}`,       'day'] : [`${days}`,       'days']) : undefined,
    showHours   ? (  hours === 1 ? [`${hours}`,     'hour'] : [`${hours}`,     'hours']) : undefined,
    showMinutes ? (minutes === 1 ? [`${minutes}`, 'minute'] : [`${minutes}`, 'minutes']) : undefined,
    showSeconds ? (seconds === 1 ? [`${seconds}`, 'second'] : [`${seconds}`, 'seconds']) : undefined
  ]);
}