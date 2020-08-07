var helpers = require("../helpers.js")
/*
=== VWR Relative Wind Speed and Angle ===

Note: This is no longer a sentence that is recommended by the NMEA 0183 Standard Committee
for new designs, however it does exist in a lot of equipment.

------------------------------------------------------------------------------
        1  2  3  4  5  6  7  8 9
        |  |  |  |  |  |  |  | |
$--VWR,x.x,a,x.x,N,x.x,M,x.x,K*hh
------------------------------------------------------------------------------

Field Number:
 
1) Wind direction magnitude in degrees
2) Wind direction Left/Right of bow
3) Speed
4) N
5) Speed
6) M = Meters Per Second
7) Speed
8) K = Kilometers Per Hour
9) Checksum
 */
exports.TYPE = 'wind-relative';
exports.ID = 'VWR';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    angle: +fields[1],
    direction: fields[2],
    speedKnots: +fields[3],
    speedMs: +fields[5],
    speedKmph: +fields[7]
  }
}