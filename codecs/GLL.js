var helpers = require("../helpers.js")

/*
=== GLL - Geographic Position - Latitude/Longitude ===

------------------------------------------------------------------------------
        1       2 3        4 5         6 7   8
        |       | |        | |         | |   |
 $--GLL,llll.ll,a,yyyyy.yy,a,hhmmss.ss,a,m,*hh<CR><LF>
------------------------------------------------------------------------------

Field Number: 

1. Latitude
2. N or S (North or South)
3. Longitude
4. E or W (East or West)
5. Universal Time Coordinated (UTC)
6. Status A - Data Valid, V - Data Invalid
7. FAA mode indicator (NMEA 2.3 and later)
8. Checksum
 */

exports.TYPE = 'geo-position';
exports.ID = 'GLL';

exports.decode = function(fields) {
        return {
            sentence: exports.ID,
            type: 'geo-position',
            timestamp: fields[5],
            lat: fields[1],
            latPole: fields[2],
            lon: fields[3],
            lonPole: fields[4],
            timestamp: fields[5],
            status: fields[6] == 'A' ? 'valid' : 'invalid'
        };
    }

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.lat));
  result.push(msg.latPole);
  result.push(helpers.encodeDegrees(msg.lon));
  result.push(msg.lonPole);
  result.push(helpers.encodeTime(msg.timestamp));
  result.push('A');
  result.push('D');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
}