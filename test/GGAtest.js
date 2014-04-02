var should = require('should');

describe('GGA ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPGGA,172814.0,3723.46587704,N,12202.26957864,W,2,6,1.2,18.893,M,-25.669,M,2.0,0031*4F");
    msg.should.have.property('type', 'fix');
    msg.should.have.property('sentence', 'GGA');
  });
});