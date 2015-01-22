var helpers = require("../helpers.js")
/*
 === HDT - Heading - True ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--HDT,x.x,T*hh
 ------------------------------------------------------------------------------

 Field Number:

 1) Heading Degrees, true
 2) T = True
 3) Checksum
 */
exports.TYPE = 'heading-info';
exports.ID = 'HDT';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: 'heading-info',
    heading: +fields[1]
  }
};

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeFixed(msg.heading, 1));
  result.push('T');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
};