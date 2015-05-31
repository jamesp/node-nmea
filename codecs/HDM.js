var helpers = require("../helpers.js")
/*
 === HDM - Heading - Magnetic ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--HDM,x.x,M*hh
 ------------------------------------------------------------------------------

 Field Number:

 1) Heading Degrees, magnetic
 2) M = Magnetic
 3) Checksum
 */
exports.TYPE = 'heading-info-magnetic';
exports.ID = 'HDM';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: 'heading-info-magnetic',
    heading: +fields[1]
  }
};

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeFixed(msg.heading, 1));
  result.push('M');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
};