import _ from 'lodash';

const {candidates} = require('../../../../../../../data/datasets/processed/candidates.json');
const {parties} = require('../../../../../../../data/datasets/processed/parties.json');

module.exports = ['$interval', '$timeout', ($interval, $timeout) => ({
  // getDB,
  // getWorkouts,
  // getExercises,
  // getExerciseById,
  getCandidates,
  getParties,

  getDraft: ((draft) => () => draft)(getDraft({$interval, $timeout})), // wut wut

  getLeagues,
  getLeagueById,

  createLeague
})];

function getCandidates() { return candidates; } // This is a writable copy! Careful
function getParties() { return parties; }

function getDraft({$interval, $timeout}) {
  return new Draft({$interval, $timeout});
}

class Draft {
  constructor({$interval, $timeout, data, listeners} = {}) { // Will allow this level of customization for now
    data = data || {};
    listeners = listeners || {};

    _.extend(this, {$interval, $timeout, data, listeners});
  }

  set(name, value) {
    const {data, listeners} = this,
          {startTime} = this.bound();

    data[name] = value;

    switch(name) {
      case 'startTime': startTime(value); break;
    }

    (listeners[name] || []).forEach(listener => listener(value, name));
  }

  get(name) {
    const {data} = this;

    return data[name];
  }

  when(name, callback) {
    const {data, listeners} = this;

    (listeners[name] = listeners[name] || []).push(callback);
    callback(data[name], name);
  }

  startTime(value) {
    let {$interval, $timeout, interval} = this,
        {setCountdown} = this.bound();

    if (interval) $interval.cancel(interval);

    interval = $interval(setCountdown, 1000);
    $timeout(setCountdown, 0);

    _.extend(this, {interval});
  }

  get countdown() { return this.data['countdown']; }

  setCountdown(value) {
    const {data} = this,
          {set} = this.bound();

    const now = new Date().getTime(),
          {startTime} = data,
          left = startTime - now;

    set('countdownString', timeToString(left));
    set('countdown', parseTime(left));
  }

  bound() {
    return {
      set: this.set.bind(this),
      setCountdown: this.setCountdown.bind(this),
      startTime: this.startTime.bind(this)
    };
  }
}

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

// Just an in-memory stub
const leagues = {
  'test': {
    id: 'test',
    name: 'Just a Test League Bro',
    members: [{name: 'Blake'}, {name: 'Rob'}]
  }
};
function getLeagues() { return leagues; }
function getLeagueById(id) {
  return leagues[id];
}

// Putting this here just so it's by these other data functions.
// Most of this will be moved out eventually
function createLeague() {
  return {
    stable: []
  };
}

// Ignore the rest. This is a work-in-progress for an
// experimental in-memory database designed for
// easy binding for Angular

// function assignIds(obj) {
//   return _.each(obj, (value, id) => (value.id = id));
// }

// const tasks = assignIds({
//   'rest': {
//     description: 'Rest',
//     instructions: [
//       'Relax',
//       'Breathe'
//     ],
//     costs: {
//       time: {
//         setup: 0,
//         each: 5 * 1000,
//         teardown: 0
//       }
//     }
//   },
//   'squats': {
//     description: 'Squats',
//     instructions: [
//       'Stand with feet slightly more than shoulders\'s width apart.',
//       'Slowly bend knees until hips are lower than knees.',
//       'Slowly stand up'
//     ],
//     costs: {
//       time: {
//         setup: 3 * 1000,
//         each: 4 * 1000,
//         teardown: 2 * 1000
//       }
//     }
//   },
//   'pushups': {
//     description: 'Pushups',
//     tutorial: 'https://www.youtube.com/embed/5eSM88TFzAs',
//     instructions: [
//       'Lie on your stomach.',
//       'Place your hands flat on the floor, next to your shoulders.',
//       'Lift your body of the floor using your hands.'
//     ],
//     costs: {
//       time: {
//         setup: 3 * 1000,
//         each: 4 * 1000,
//         teardown: 2 * 1000
//       }
//     }
//   },
//   'situps': {
//     description: 'Situps',
//     instructions: [
//       'Lie on your back.',
//       'Place your feet flat on the floor. Your knees should be bent, off the floor, and together.',
//       'Place your hands behind your head.',
//       'Rotate your head towards your knees, keeping your back and neck straight. You should only bend near your hips.'
//     ],
//     costs: {
//       time: {
//         setup: 5 * 1000,
//         each: 4 * 1000,
//         teardown: 4 * 1000
//       }
//     }
//   }
// });

// const exercises = assignIds({
//   '1': {
//     name: 'Squats',
//     description: 'Squats',
//     tasks: [{
//       task: tasks['squats'],
//       quantity: 5
//     }]
//   },
//   '2': {
//     name: 'Pushups',
//     description: 'Pushups',
//     tasks: [{
//       task: tasks['pushups'],
//       quantity: 5
//     }]
//   },
//   '3': {
//     name: 'Rest',
//     description: 'Rest',
//     tasks: [{
//       task: tasks['rest'],
//       quantity: 5
//     }]
//   },
//   '4': {
//     name: 'Sit-ups',
//     description: 'Sit-ups',
//     tasks: [{
//       task: tasks['situps'],
//       quantity: 10
//     },{
//       task: tasks['rest'],
//       quantity: 5
//     },{
//       task: tasks['situps'],
//       quantity: 10
//     }]
//   }
// });

// const workouts = assignIds({
//   '1': {
//     name: 'Workout 1',
//     description: 'First Workout!',
//     exercises: [
//       exercises['1']
//     ,
//       exercises['2']
//     ]
//   },
//   '2': {
//     name: 'Pushups',
//     description: 'All pushups, all the time',
//     exercises: [
//       exercises['2']
//     ]
//   },
//   '3': {
//     name: 'Nap Time',
//     description: 'Need rest',
//     exercises: [
//       exercises['3']
//     ]
//   },
//   '4': {
//     name: 'Ab Lab',
//     description: 'New Abs',
//     exercises: [
//       exercises['4']
//     ,
//       exercises['4']
//     ,
//       exercises['4']
//     ,
//       exercises['4']
//     ]
//   }
// });

// function getWorkouts() {
//   return workouts;
// }

// function getExercises() {
//   return exercises;
// }

// function getByName(name) {
//   console.log('looking for', name);
//   return _.find(exercises, {'name': name});
// }

// function getExerciseById(id) {
//   return exercises[id];
// }


// function init(db = {}) {
//   db.clock = 0;

//   return _.extend(db, {
//     register
//   });

//   function register(obj) {
//     const schemas = {},
//           constructors = {};

//     _.each(obj, (schema, name) => {
//       schemas[name] = schema;
//       constructors[name] = create(name, schema);
//     });

//     return name => constructors[name]();

//     function create(name, schema) {
//       return () => {
//         const obj = {},
//               data = {},
//               eventStream = stream();

//         if (!schema) throw Error(`No schema with name: ${name}!`);

//         if (_.isArray(schema)) {
//           console.log(name, schema, 'is array');
//           const dependencies = schema.slice(0, schema.length - 1),
//                 fn = schema[schema.length - 1];

//           return wrappedArray(fn(..._.map(dependencies, name => constructors[name])));
//         }
//         else {
//           process(schema);
//         }

//         function process(schema) {
//           _.each(schema, (type, propertyName) => {
//             if (typeof type === 'function') type = type(name, propertyName);
//             else if (typeof type === 'string') return; // skip for now

//             add(type, propertyName);
//           });

//           function add(type, propertyName) {
//             const {name: typeName, initializer, setter} = type;

//             initializer(data, propertyName);

//             Object.defineProperty(obj, propertyName, {
//               get: () => data[propertyName],
//               set: value => eventStream.emit(setter(data, propertyName, value))
//             });
//           }
//         }

//         function wrappedArray(schema) {
//           return {};
//         }

//         return {
//           obj,
//           eventStream
//         };

//         function stream() {
//           let callback = defaultCallback;

//           return {
//             emit,
//             on
//           };

//           function defaultCallback() {}

//           function emit(event) {
//             callback(event);
//           }

//           function on(c) {
//             callback = c || defaultCallback;
//             return unregister;
//           }

//           function unregister() {
//             callback = defaultCallback;
//           }
//         }
//       };
//     }
//   }
// }

// // exercises: [
// //   {pushups: 10},
// //   {situps: 5},
// //   {pushups: 6}
// // ]
// function getDB() {
//   const schema = {
//     'workout': ['exercise', exercise => ({
//       'id': auto,
//       'name': string,
//       'description': string,
//       'exercises': [exercise]
//     })],
//     'exercise': ['task', task => ({
//       'id': auto,
//       'name': string,
//       'description': string,
//       'tasks': ['task'],

//       $timeEstimate: {
//         get: ['tasks', tasks => _.sum(tasks, ({timeEstimate}) => timeEstimate)]
//       }
//     })],
//     'task': {
//       'id': auto,
//       'name': string,
//       'description': string,
//       'quantity': integer,
//       'instructions': [string],
//       'costs': {
//         time: {
//           'setup': milliseconds,
//           'each': milliseconds,
//           'teardown': milliseconds
//         }
//       },

//       $timeEstimate: {
//         get: ['$task', $task => {
//           const {costs, quantity} = $task,
//                 {setup, each, teardown} = costs;

//           return setup + each * quantity + teardown;
//         }]
//       }
//     }
//   };

//   const db = init();

//   const constructor = db.register(schema);

//   db.test = constructor('workout');

//   return db;
// }



// function auto() {
//   let id = 0;

//   return {
//     name: 'auto',
//     initializer: (data, propertyName) => {
//       data[propertyName] = id++;
//     },
//     setter: (data, propertyName, value) => {
//       throw Error(`Cannot set ${propertyName}`, {data, value});
//     }
//   };
// }

// function string() {
//   return defineType('string');
// }

// function integer() {
//   return defineType('integer');
// }

// function bool() {
//   return defineType('bool');
// }

// function datetime() {
//   return defineType('datetime');
// }

// function milliseconds() {
//   return defineType('milliseconds');
// }

// function defineType(name, setter = defaultSetter) {
//   return {
//     name,
//     initializer: defaultInitializer,
//     setter
//   };
// }

// function defaultInitializer() { }

// function defaultSetter(data, propertyName, value) {
//   data[propertyName] = value;

//   return {
//     set: {
//       [propertyName]: value
//     }
//   };
// }