var should = require('should');

describe('GGA ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$IIGGA,123519,4807.04,N,1131.00,E,1,8,0.9,545.9,M,46.9,M,,*52");
    msg.should.have.property('type', 'fix');
    msg.should.have.property('sentence', 'GGA');
    msg.should.have.property('talker_id', 'II');
    msg.should.have.property('timestamp', '123519');
    msg.should.have.property('lat', '4807.04');
    msg.should.have.property('latPole', 'N');
    msg.should.have.property('lon', '1131.00');
    msg.should.have.property('lonPole', 'E');
    msg.should.have.property('fixType', 'fix');
    msg.should.have.property('numSat', 8);
    msg.should.have.property('horDilution', 0.9);
    msg.should.have.property('alt', 545.9);
    msg.should.have.property('altUnit', 'M');
    msg.should.have.property('geoidalSep', 46.9);
    msg.should.have.property('geoidalSepUnit', 'M');
  });
});


describe('GGA', function () {
  it('encodes ok', function () {
    var nmeaMsg = require("../nmea.js").encode('II', {
      type: 'fix',
      timestamp: new Date(Date.UTC(2013, 1, 1, 12, 35, 19)),
      lat: 4807.04, 
      latPole: 'N',
      lon: 1131.00, 
      lonPole: 'E',
      fixType: 'fix',
      numSat: 8,
      horDilution: 0.9,
      alt: 545.9,
      altUnit: 'M',
      geoidalSep: 46.9,
      geoidalSepUnit: 'M'
    });
    nmeaMsg.should.equal("$IIGGA,123519,4807.04,N,1131.00,E,1,8,0.9,545.9,M,46.9,M,,*52");
  });
});