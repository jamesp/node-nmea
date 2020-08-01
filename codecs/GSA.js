/*
   === GSA - GPS DOP and active satellites ===
   
   This is one of the sentences commonly emitted by GPS units.

   ------------------------------------------------------------------------------
           1 2 3 4                      14 15  16  17  18
           | | | |                       |  |   |   |   |
    $--GSA,a,a,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x.x,x.x,x.x*hh
   ------------------------------------------------------------------------------

   Field Number:

    1) Selection mode
    2) Mode
    3) ID of 1st satellite used for fix
    4) ID of 2nd satellite used for fix
    ...
   14) ID of 12th satellite used for fix
   15) PDOP in meters
   16) HDOP in meters
   17) VDOP in meters
   18) Checksum
*/
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
    PDOP: +fields[15],
    HDOP: +fields[16],
    VDOP: +fields[17]
  };
}