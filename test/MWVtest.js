var chai = require("chai");
chai.Should();
chai.use(require('chai-things'));
chai.use(require('signalk-schema').chaiModule);

var Multiplexer = require('signalk-multiplexer');




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

describe('MWV to SignalK', function () {
  it('parses ok', function () {
    var delta = require("../nmea.js").toSignalK("$IIMWV,017,R,02.91,N,A*2F");
    delta.updates[0].values.should.include({
      "path": "environment.wind.speedApparent",
      "value": 2.91
    });
    delta.updates[0].values.should.include({
      "path": "environment.wind.speedApparent",
      "value": 2.91
    });
    delta.context = "vessels.12345";
    var myMultiplexer = new Multiplexer('1234', 'uuid');
    myMultiplexer.add(delta);
    delta.should.be.validSignalKDelta;
    myMultiplexer.retrieve().vessels['12345'].should.be.validSignalK;
  });
});
