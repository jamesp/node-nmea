var should = require('should');

describe('GSV ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPGSV,3,1,11,03,03,111,00,04,15,270,00,06,01,010,00,13,06,292,00*74 $GPGSV,3,2,11,14,25,170,00,16,57,208,39,18,67,296,40,19,40,246,00*2D");
    msg.should.have.property('type', 'satellite-list-partial');
    msg.should.have.property('sentence', 'GSV');
  });
});