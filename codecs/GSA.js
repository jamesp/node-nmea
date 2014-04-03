exports.TYPE = 'active-satellites';
exports.ID = 'GSA';

exports.decode = function(fields) {
  // $GPGSA,A,3,12,05,25,29,,,,,,,,,9.4,7.6,5.6
  var sats = [];
  for (var i=1; i < 13; i++) {
    if (fields[i+2]) sats.push(+fields[i+2]);
  };
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    selectionMode: fields[1],
    mode: +fields[2],
    satellites: sats,
    PDOP: fields[15],
    HDOP: fields[16],
    VDOP: fields[17]
  };
}