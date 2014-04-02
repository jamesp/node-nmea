var should = require('should');

describe('VTG parsing', function () {
  it('parses ok', function () {
    var msg = require("../nmea.js").parse("$IIVTG,210.43,T,210.43,M,5.65,N,,,A*67");
    msg.should.have.property('sentence', 'VTG');
    msg.should.have.property('type', 'track-info');
    msg.should.have.property('trackTrue', 210.43);
    msg.should.have.property('trackMagnetic', 210.43);
    msg.should.have.property('speedKnots', 5.65);
  });
});

describe('VTG encoding', function () {
  it('encodes ok', function () {
    var nmeaMsg = require("../nmea.js").encode('XX', {
      type: 'track-info',
      trackTrue: 210.43,
      trackMagnetic: 209.43,
      speedKnots: 2.91
    });
    nmeaMsg.should.equal("$XXVTG,210.43,T,209.43,M,2.91,N,,,A*63");
  });
});
