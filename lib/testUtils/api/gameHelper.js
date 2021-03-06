/**
 * test/api/gameHelper
 *
 * Created by niko on 2/3/14.
 */

var Q = require('q');

exports.createGameQ = function (params, expectedStatusCode) {
  var agent = params.agent;
  var gameConfig = params.gameConfig;
  var expectedStatusCode = params.expectedStatusCode || expectedStatusCode; //TODO refactor second function param out

  return Q.promise(function (resolve, reject) {
    agent.post('/games').send({"gameConfig" : gameConfig}).expect(expectedStatusCode || 200).end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.readGameQ = function (params) {
  var agent = params.agent;
  var gameId = params.gameId;

  return Q.promise(function (resolve, reject) {
    agent.get('/games/' + gameId).send({}).expect(params.expectedStatusCode || 200).end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.joinGameQ = function (params) {
  var agent = params.agent;
  var gameId = params.gameId;       //TODO i think we can refactor out params.fail
  var expectedStatusCode = params.expectedStatusCode ? params.expectedStatusCode : (params.fail ? 400 : 200);

  return Q.promise(function (resolve, reject) {
    var request = agent.post('/games/' + gameId + '/join').send({});

    request.expect(expectedStatusCode);

    request.end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.playTurnQ = function (params) {
  var agent = params.agent,
    turn = params.turn,
    expectedStatusCode = params.expectedStatusCode || 200;

  return Q.promise(function (resolve, reject) {
    var request = agent.post('/playTurn').send(turn);

    request.expect(expectedStatusCode);

    request.end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.playGameTurnQ = function (params) {
  var agent = params.agent,
    gameId = params.gameId,
    turn = params.turn,
    expectedStatusCode = params.expectedStatusCode || 200;

  return Q.promise(function (resolve, reject) {
    var request = agent.post('/games/' + gameId + '/playTurn').send(turn);

    request.expect(expectedStatusCode);

    request.end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

///////////////////////////////////////////////////////////

exports.readUsersGamesQ = function (params) {
  var agent = params.agent;
  var userId = params.userId;
  var expectedStatusCode = params.expectedStatusCode || 200;

  return Q.promise(function (resolve, reject) {
    var request = agent.get('/users/' + userId + '/games').send({});

    request.expect(expectedStatusCode);

    request.end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

///////////////////////////////
// maybe the one function to rule them all

exports.sendRestRequest = function (params) {
  var agent = params.agent;

  var verb = params.verb.toLowerCase();
  var endpoint = params.endpoint;

  var body = params.body || {};

  var expectedStatusCode = params.expectedStatusCode || 200;

  return Q.promise(function (resolve, reject) {
    var request;

    switch (verb){
      case 'post':
        request = agent.post(endpoint); break;
      case 'get':
        request = agent.get(endpoint); break;
      case 'put':
        request = agent.put(endpoint); break;
      case 'del':
        request = agent.del(endpoint); break;
      default:
        throw 'wrong verbage';
    }

    request = request.send(body);
    request.expect(expectedStatusCode);

    request.end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.readGameBoardQ = function (params) {
  var agent = params.agent;
  var gameId = params.gameId;
  return Q.promise(function (resolve, reject) {
    agent.get('/games/' + gameId + '/board').send({}).expect(params.expectedStatusCode || 200).end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};

exports.readGameStateQ = function (params) {
  var agent = params.agent;
  var gameId = params.gameId;
  return Q.promise(function (resolve, reject) {
    agent.get('/games/' + gameId + '/state').send({}).expect(params.expectedStatusCode || 200).end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};
