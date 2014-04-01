exports.TYPE = 'fix';
exports.ID = 'GGA';

exports.decode = function(fields) {
  var FIX_TYPE = ['none', 'fix', 'delta'];
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    timestamp: fields[1],
    lat: fields[2],
    latPole: fields[3],
    lon: fields[4],
    lonPole: fields[5],
    fixType: FIX_TYPE[+fields[6]],
    numSat: +fields[7],
    horDilution: +fields[8],
    alt: +fields[9],
    altUnit: fields[10],
    geoidalSep: +fields[11],
    geoidalSepUnit: fields[12],
    differentialAge: +fields[13],
    differentialRefStn: fields[14]
  };
}