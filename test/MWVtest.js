var should = require('should');

describe('MWV parsing', function () {
  it('parses ok', function () {
    var msg = require("../nmea.js").parse("$IIMWV,017,R,02.91,N,A*2F");
    msg.should.have.property('sentence', 'MWV');
    msg.should.have.property('type', 'wind');
    msg.should.have.property('angle', 17);
    msg.should.have.property('reference', 'R');
    msg.should.have.property('speed', 2.91);
    msg.should.have.property('units', 'N');
    msg.should.have.property('status', 'A');
  });
});

describe('MWV encoding', function () {
  it('parses ok', function () {
    var nmeaMsg = require("../nmea.js").encode('XX', {
      type: 'wind',
      angle: 17,
      reference: 'R',
      speed: 2.91,
      units: 'N',
      status: 'A'});
    nmeaMsg.should.equal("$XXMWV,017.00,R,2.91,N,A*31");
  });
});
