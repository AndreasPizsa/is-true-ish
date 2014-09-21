regexp = /^(?:yes|y|true|t|on|1|ok)$/i;

module.exports = function(value) {
  return typeof value === 'string' && value.search(regexp) != -1;
};

module.exports.regexp = regexp;
