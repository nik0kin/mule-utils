//meant to be used in multiple places (controller code and test code)

var _ = require('lodash');

exports.doesGameContainPlayerId = function (playerId, game) {
  var answer = false;

  _.each(game.players, function (value, key) {
    if (value.playerId == playerId){
      answer = true;
    }
  });

  return answer;
};
