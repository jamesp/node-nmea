var should = require('should');

describe('RDID ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$PRDID,-1.31,7.81,47.31*68");
    msg.should.have.property('type', 'gyro');
    msg.should.have.property('sentence', 'RDID');
  });
});

