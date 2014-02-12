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

  return mongooseObject;
};