/**
 * Created by niko on 2/6/14.
 */

var Q = require('q');

exports.readUserQ = function (params) {
  var agent = params.agent;
  var userId = params.userId;

  return Q.promise(function (resolve, reject) {
    agent.get('/users/' + userId).send({}).expect(200).end(function(err, res){
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });
};
