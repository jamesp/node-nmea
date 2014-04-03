var helpers = require("../helpers.js")
/*
 === MWV - Wind Speed and Angle ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5
 *******|   | |   | |
 $--MWV,x.x,a,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Wind Angle, 0 to 360 degrees
 2. Reference, R = Relative, T = True
 3. Wind Speed
 4. Wind Speed Units, K/M/N
 5. Status, A = Data Valid
 6. Checksum
 */
exports.TYPE = 'wind';
exports.ID = 'MWV';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    angle: +fields[1],
    reference: fields[2],
    speed: +fields[3],
    units: fields[4],
    status: fields[5]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.angle));
  result.push(msg.reference);
  result.push(helpers.encodeFixed(msg.speed, 2));
  result.push(msg.units);
  result.push(typeof msg.status === undefined ? 'A' : msg.status);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}