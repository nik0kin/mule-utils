/**
 * responseUtils
 * - @nikpoklitar
 *
 * http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 * https://dev.twitter.com/docs/error-codes-responses
 */

var winston = require('winston');

exports.getNewResponseJSON = function () {
  return {
    status : 0,
    statusMsg : "Default Success"
  };
};

///////// RESPONSE HELPERS /////////////

exports.sendResponse = function (params, res, err) {
  var responseCode = params.responseCode;
  var messageString = params.messageString;

  var response = exports.getNewResponseJSON();
  response.status = -1;

  err.errorMsg = messageString;
  response.statusMsg = err;
  winston.error('Sending Error Response (' + messageString + ')', err);

  return res.status(responseCode).send(response);
};

exports.sendResponseCallback = function (params, res) {
  return function (err) {
    return exports.sendResponse(params, res, err);
  };
};

///////// SERVER ERRORS /////////////

// 400 : Bad Request : The request cannot be fulfilled due to bad syntax ///

var badRequestParams = {
  responseCode : 400,
  messageString : 'Bad Request'
};

exports.sendBadRequest = function (res, err) {
  return exports.sendResponse(badRequestParams, res, err);
};
exports.sendBadRequestCallback = function (res) {
  return exports.sendResponseCallback(badRequestParams, res);
};

// 401 : Unauthorized : Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. ///

var unauthorizedParams = {
  responseCode : 401,
  messageString : 'Unauthorized'
};

exports.sendUnauthorizedError = function (res, err) {
  return exports.sendResponse(unauthorizedParams, res, err);
};
exports.sendUnauthorizedErrorCallback = function (res) {
  return exports.sendResponseCallback(unauthorizedParams, res);
};

/// 403 : Forbidden : The request is understood, but it has been refused or access is not allowed. ///

var forbiddenParams = {
  responseCode : 403,
  messageString : 'Forbidden'
};

exports.sendForbiddenError = function (res, err) {
  return exports.sendResponse(forbiddenParams, res, err);
};
exports.sendForbiddenErrorCallback = function (res) {
  return exports.sendResponseCallback(forbiddenParams, res);
};

/// 404 : Not Found : The URI requested is invalid or the resource requested, such as a user, does not exists. ///

var notFoundParams = {
  responseCode : 404,
  messageString : 'Not Found'
};

exports.sendNotFoundError = function (res, err) {
  return exports.sendResponse(notFoundParams, res, err);
};
exports.sendNotFoundErrorCallback = function (res) {
  return exports.sendResponseCallback(notFoundParams, res);
};

/// 406 : Not Acceptable : Returned when an invalid format is specified in the request. ///

var notAcceptableParams = {
  responseCode : 406,
  messageString : 'Not Acceptable'
};

exports.sendNotAcceptableError = function (res, err) {
  return exports.sendResponse(notAcceptableParams, res, err);
};
exports.sendNotAcceptableErrorCallback = function (res) {
  return exports.sendResponseCallback(notAcceptableParams, res);
};

///////// SERVER ERRORS /////////////

/// 500 : Internal Server Error : Something is broken. Something in MULE CODE is wrong ///

var internalServerErrorParams = {
  responseCode : 500,
  messageString : 'Internal Server Error'
};

exports.sendInternalServerError = function (res, err) {
  return exports.sendResponse(internalServerErrorParams, res, err);
};
exports.sendInternalServerErrorCallback = function (res) {
  return exports.sendResponseCallback(internalServerErrorParams, res);
};

/// 501 : Not Yet Implemented ///

var notYetImplementedParams = {
  responseCode : 501,
  messageString : 'Not Yet Implemented'
};

exports.sendNotYetImplemented = function (res, err) {
  return exports.sendResponse(notYetImplementedParams, res, err);
};
exports.sendNotYetImplementedCallback = function (res) {
  return exports.sendResponseCallback(notYetImplementedParams, res);
};
