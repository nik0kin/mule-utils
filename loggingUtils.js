var _ = require('lodash'),
  winston = require('winston'),
  colors = require('colors');

var dateUtils = require('./dateUtils');

var logLevel;

exports.init = function (_logLevel, filename) {
  logLevel = _logLevel || 3;

  winston.add(winston.transports.File, {filename: filename});
  winston.remove(winston.transports.Console);
};

exports.initWithLoggerObj = function (initLoggerObj) {
  module.exports = initLoggerObj;
};

var levels = {
  5: 'VVVV',
  4: 'VERB',
  3: 'DEBU',
  2: 'INFO',
  1: 'MLOG',
  0: 'ERRR'
}

var baseLog = function (ll, color, message, gameId, metadata) {
  if (logLevel >= ll) {
    winston.log('info', levels[ll], message, gameId, metadata);
    var idStr = !!gameId ? '[' + toDressShortId(gameId) + '] ' : ' ',
      metadataString = !!metadata && metadata.toString !== '[object Object]' ? metadata.toString() : JSON.stringify(metadata),
      metaStr = !!metadata ? ' | ' + metadataString : '';
    console.log('[' + levels[ll][color] + '][' + dateUtils.getTimeString() + ']' + idStr + message + metaStr);

    if (!!metadata && metadata.stack) {
      console.log(metadata.stack);
    }
  }
};

// 5 - Very Verbose
exports.vvog = function (message, gameId, metadata) {
  baseLog(5, 'gray', message, gameId, metadata);
};

// 4 - Verbose
exports.vog = function (message, gameId, metadata) {
  baseLog(4, 'gray', message, gameId, metadata);
};

// 3 - Debug
var dog = function (message, gameId, metadata) {
  baseLog(3, 'yellow', message, gameId, metadata);
};
exports.dog = dog;
exports.debug = dog;

// 2 - Info
var log = function (message, gameId, metadata) {
  baseLog(2, 'blue', message, gameId, metadata);
};
exports.log = log;
exports.info = log;

// 1 - Bundle Log
exports.MLog = function (message, gameId, metadata) {
  baseLog(1, 'green', message, gameId, metadata);
};

// 0 - Error Log
var err = function (message, gameId, metadata) {
  baseLog(0, 'red', message, gameId, metadata);
};
exports.err = err;
exports.error = err;

var toShortId = function (id) {
  var str = String(id),
    strLen = str.length;
  return str.substring(0,3) + str.substring(strLen-3, strLen);
};

var listOfStyles = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'
];

var alphabetColors = {};
_(26).times(function (i) {
  var letter = String.fromCharCode('a'.charCodeAt(0) + i);
  alphabetColors[letter] = listOfStyles[(26-i) % listOfStyles.length];
});
_(10).times(function (i) {
  alphabetColors[i] = listOfStyles[(10-i) % listOfStyles.length];
});

var toDressShortId = function (id) {
  var shortId = toShortId(id),
    str = '';

  _(6).times(function (i) {
    var key = String(shortId.charAt(i));
    str += key[alphabetColors[key]];
  });

  return str;
};
