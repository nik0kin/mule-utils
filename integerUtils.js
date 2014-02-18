/**
 * Created by niko on 2/13/14.
 */

var _ = require('underscore');

exports.isMinMaxIntegerObject = function (object) {
  return object && exports.isInt(object.min) && exports.isInt(object.max) && (object.max > object.min);
};

exports.isInt = function (n) {
  return _.isNumber(n) && n % 1 === 0;
};

exports.isIntegerMinMaxValid = function (number, minMaxObject) {
  return number >= minMaxObject.min && number <= minMaxObject.max;
};

exports.validateIntegerInArrayOrMinMax = function (ruleBundleParamSpec, paramInt) {
  //array
  if (_.isArray(ruleBundleParamSpec)){
    return _.contains(ruleBundleParamSpec, paramInt);
  }
  //minmax
  if (exports.isMinMaxIntegerObject(ruleBundleParamSpec)){
    return exports.isIntegerMinMaxValid(paramInt, ruleBundleParamSpec);
  }

  throw 'bad ruleBundle Spec';
};
