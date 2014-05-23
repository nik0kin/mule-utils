/**
 * Created by niko on 2/11/14.
 */

var env = process.env.NODE_ENV || 'development',
  config = require('./config')[env];

var mongooseObject;

global.getMongoose = function () {
  if (mongooseObject)
    return mongooseObject;

  mongooseObject = require('mongoose-q')(require('mongoose'));
  mongooseObject.connect(config.db);

  var db = mongooseObject.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('MongoDB online');
  });
  // put this under mule-models/node_modules/mule-utils

  console.log('returning mongooseObject')
  return mongooseObject;
};