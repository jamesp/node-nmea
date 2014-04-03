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