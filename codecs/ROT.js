var helpers = require("../helpers.js")
/*
 === ROT - Rate Of Turn ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--ROT,x.x,A*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Rate Of Turn, degrees per minute, "-" means bow turns to port
 2. Status, "A" means data is valid
 3. Checksum
 */
exports.TYPE = 'rate-of-turn';
exports.ID = 'ROT';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    rateOfTurn: +fields[1],
    valid: fields[2] === "A",
  }
};

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeFixed(msg.rateOfTurn, 2));
  result.push('A');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
}
