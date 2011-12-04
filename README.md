A NMEA-0183 GPS Protocol parser
===============================

An example using the node-serialport library to read a stream of messages
from a GlobalSat BU-353 USB GPS receiver:

````
var serialport = require('serialport');
var nmea = require('nmea');

var port = new serialport.SerialPort('/dev/cu.usbserial', {
                baudrate: 4800,
                parser: serialport.parsers.readline('\r\n')});
    
port.on('data', function(line) {
    console.log(nmea.parse(line));
});

// { type: 'active-satellites',
//   selectionMode: 'A',
//   mode: 1,
//   satellites: [ 29, 18, 21 ],
//   PDOP: '',
//   HDOP: '',
//   VDOP: '',
//   talker_id: 'GP' }
// { type: 'satellite-list-partial',
//   numMsgs: 3,
//   msgNum: 1,
//   satsInView: 11,
//   satellites: 
//    [ { id: '18', elevationDeg: 7, azimuthTrue: 214, SNRdB: 43 },
//      { id: '21', elevationDeg: 5, azimuthTrue: 114, SNRdB: 34 },
//      { id: '26', elevationDeg: 71, azimuthTrue: 234, SNRdB: 0 } ],
//   talker_id: 'GP' }

````