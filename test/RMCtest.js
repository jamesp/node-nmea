var should = require('should');

describe('RMC ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A");
    msg.should.have.property('type', 'nav-info');
    msg.should.have.property('sentence', 'RMC');
  });
});