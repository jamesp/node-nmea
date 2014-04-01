var should = require('should');

describe('GGA ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPAPB,A,A,0.10,R,N,V,V,011,M,DEST,011,M,011,M*3C");
    msg.should.have.property('type', 'autopilot-b');
    msg.should.have.property('sentence', 'APB');
  });
});

