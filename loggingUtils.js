var winston = require('winston'),
  colors = require('colors');

var dateUtils = require('./dateUtils');

var logLevel;

exports.init = function (_logLevel, filename) {
  logLevel = _logLevel || 3;

  winston.add(winston.transports.File, {filename: filename});
  winston.remove(winston.transports.Console);
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
    winston.log(levels[ll], message, gameId, metadata);
    var idStr = !!gameId ? '[' + toShortId(gameId) + '] ' : '',
      metaStr = !!metadata ? ' | ' + JSON.stringify(metadata) : '';
    console.log('[' + levels[ll][color] + '] [' + dateUtils.getDateString() + '] ' + idStr + message + metaStr);
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
exports.dog = function (message, gameId, metadata) {
  baseLog(3, 'yellow', message, gameId, metadata);
};

// 2 - Info
exports.log = function (message, gameId, metadata) {
  baseLog(2, 'blue', message, gameId, metadata);
};

// 1 - Bundle Log
exports.MLog = function (message, gameId, metadata) {
  baseLog(1, 'green', message, gameId, metadata);
};

// 0 - Error Log
exports.err = function (message, gameId, metadata) {
  baseLog(0, 'red', message, gameId, metadata);
};

var toShortId = function (id) {
  var str = String(id),
    strLen = str.length;
  return str.substring(0,3) + str.substring(strLen-3, strLen);
};
