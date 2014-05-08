//meant to be used in multiple places (controller code and test code)

var _ = require('lodash');

exports.doesGameContainPlayerID = function (playerID, game) {
  var answer = false;

  _.each(game.players, function (value, key) {
    if (value.playerID == playerID){
      answer = true;
    }
  });

  return answer;
};
