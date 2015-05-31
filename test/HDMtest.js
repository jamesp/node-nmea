var should = require('should');

describe('HDM parsing', function () {
  it('parse heading', function () {
    var msg = require("../nmea.js").parse("$IIHDM,201.5,M*24");
    msg.should.have.property('sentence', 'HDM');
    msg.should.have.property('heading', 201.5);
  });
});

describe('HDM encoding', function () {
  it('encodes ok', function () {
    var nmeaMsg = require("../nmea.js").encode('II', {
      type: 'heading-info-magnetic',
      heading: 201.5
    });
    nmeaMsg.should.equal("$IIHDM,201.5,M*24");
  });
});