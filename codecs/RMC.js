/*
   === RMC - Recommended Minimum Navigation Information ===
   
   This is one of the sentences commonly emitted by GPS units.

   ------------------------------------------------------------------------------
              1      2    3    4    5     6  7   8   9   10 11 12
              |      |    |    |    |     |  |   |   |    |  | |
    $--RMC,hhmmss.ss,A,llll.ll,a,yyyyy.yy,a,x.x,x.x,xxxx,x.x,a*hh
   ------------------------------------------------------------------------------

   Field Number:

    1) Time (UTC)
    2) Status, V = Navigation receiver warning
    3) Latitude
    4) N or S
    5) Longitude
    6) E or W
    7) Speed over ground, knots
    8) Track made good, degrees true
    9) Date, ddmmyy
    10) Magnetic Variation, degrees
    11) E or W
    12) Checksum
*/
exports.TYPE = 'nav-info';
exports.ID = 'RMC';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    timestamp: fields[1],
    status: fields[2] == 'V' ? 'warning' : 'valid',
    lat: fields[3],
    latPole: fields[4],
    lon: fields[5],
    lonPole: fields[6],
    speedKnots: +fields[7],
    trackTrue: +fields[8],
    date: fields[9],
    variation: +fields[10],
    variationPole: fields[11]
  };
}