/*

 === RSA - Rudder Angle ===

 ------------------------------------------------------------------------------
         1  2    3
         |  |    |
 $--RSA,x.x,A,,*0B
 ------------------------------------------------------------------------------

 Field Number:

 1. Rudder Angle
 2. Always A
 3. Checksum
 
 */

exports.TYPE = 'rudder';
exports.ID = 'RSA';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    angle: +fields[1]
  }
}