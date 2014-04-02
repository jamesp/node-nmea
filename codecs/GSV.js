exports.ID = 'GSV';
exports.TYPE = 'satellite-list-partial';

exports.decode = function(fields) {
  // $GPGSV,3,1,12, 05,58,322,36, 02,55,032,, 26,50,173,, 04,31,085,
  var numRecords = (fields.length - 4) / 4,
    sats = [];
  for (var i=0; i < numRecords; i++) {
    var offset = i * 4 + 4;
    sats.push({id: fields[offset],
      elevationDeg: +fields[offset+1],
      azimuthTrue: +fields[offset+2],
      SNRdB: +fields[offset+3]});
  };
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    numMsgs: +fields[1],
    msgNum: +fields[2],
    satsInView: +fields[3],
    satellites: sats
  };
}