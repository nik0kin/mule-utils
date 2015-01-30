exports.mochaError = function (done) {
  return function (err) { done(err); }
};

