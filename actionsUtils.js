var _ = require('lodash');

exports.searchThruSpacesForId = function (spaces, spaceId) {
  var found = false;
  _.each(spaces, function (value, key) {
    if (value.boardSpaceId === spaceId) {
      found = value;
    }
  });
  return found;
};

exports.searchThruPiecesForId = function (pieces, pieceId) {
  if (typeof pieceId === 'string') {
    pieceId = parseInt(pieceId);
  }
  var found = false;
  _.each(pieces, function (value, key) {
    if (value.id === pieceId) {
      found = value;
    }
  });
  return found;
};

exports.getClassesFromPieces = function (pieces, className) {
  var found = [];

  _.each(pieces, function (value, key) {
    if (value.class === className) {
      found = value;
    }
  });

  return found;
};
