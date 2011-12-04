NMEA-0183 GPS Protocol parsing for Javascript
=============================================

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



````