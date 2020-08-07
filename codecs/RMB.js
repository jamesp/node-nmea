/*
=== RMB Recommended Minimum Navigation Information ===

To be sent by a navigation receiver when a destination waypoint is active.

------------------------------------------------------------------------------
       1  2  3   4    5     6    7    8     9 10  11  12 13 14
       |  |  |   |    |     |    |    |     |  |   |   |  | |
$--RMB,A,x.x,a,c--c,c--c,llll.ll,a,yyyyy.yy,a,x.x,x.x,x.x,A*hh
------------------------------------------------------------------------------

Field Number:

 1) Status, V = Navigation receiver warning
 2) Cross Track error - nautical miles
 3) Direction to Steer, Left or Right
 4) FROM Waypoint ID
 5) TO Waypoint ID
 6) Destination Waypoint Latitude
 7) N or S
 8) Destination Waypoint Longitude
 9) E or W
10) Range to destination in nautical miles
11) Bearing to destination in degrees True
12) Destination closing velocity in knots
13) Arrival Status, A = Arrival Circle Entered
14) Checksum

 */
exports.TYPE = 'nav-info-waypoint';
exports.ID = 'RMB';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    status: fields[1] == 'V' ? 'warning' : 'valid',
    crossTrackError: +fields[2],
    steer: fields[3],
    fromWaypoint: fields[4],
    toWaypoint: fields[5],
    lat: fields[6],
    latPole: fields[7],
    lon: fields[8],
    lonPole: fields[9],
    range: +fields[10],
    bearing: +fields[11],
    vmg: +fields[12],
    arrived: fields[13] == 'A' ? true : false
  };
}