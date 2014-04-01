/*
 === BWC - Bearing & Distance to Waypoint - Great Circle ===
 ------------------------------------------------------------------------------
 12
 1         2       3 4        5 6   7 8   9 10  11|    13 14
 |         |       | |        | |   | |   | |   | |    |   |
 $--BEC,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x.x,T,x.x,M,x.x,N,c--c,m,*hh<CR><LF>
 ------------------------------------------------------------------------------
 Field Number:
 1. UTCTime
 2. Waypoint Latitude
 3. N = North, S = South
 4. Waypoint Longitude
 5. E = East, W = West
 6. Bearing, True
 7. T = True
 8. Bearing, Magnetic
 9. M = Magnetic
 10. Nautical Miles
 11. N = Nautical Miles
 12. Waypoint ID
 13. FAA mode indicator (NMEA 2.3 and later, optional)
 14. Checksum
 */

exports.ID = 'BWC';
exports.TYPE = '2waypoint';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    lat: fields[2],
    latPole: fields[3],
    lon: fields[4],
    lonPole: fields[5],
    bearingtrue: fields[6],
    bearingmag: fields[8],
    distance: fields[10],
    id: fields[12]
  }
}