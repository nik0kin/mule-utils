var _ = require('lodash');

// from http://stackoverflow.com/questions/2380019/generate-8-unique-random-numbers-between-1-and-100
exports.pickRandom = function (array, picks) {
  array = _.clone(array);

  for (i = array.length-1; i > 1  ; i--) {
    var r = Math.floor(Math.random()*i);
    var t = array[i];
    array[i] = array[r];
    array[r] = t;
  }

  return array.slice(0,picks);
};

exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.getRandomValue = function (array) {
  if (array.length < 1)
    return undefined;
  return array[exports.getRandomInt(1, array.length) - 1];
};
