var should = require('should');

describe('VTG parsing', function () {
  it('parses ok', function () {
    var msg = require("../nmea.js").parse("$IIVTG,210.43,T,210.43,M,5.65,N,,,A*67");
    msg.should.have.property('type', 'track-info');
    msg.should.have.property('trackTrue', 210.43);
    msg.should.have.property('trackMagnetic', 210.43);
    msg.should.have.property('speedKnots', 5.65);
  });
});
