var should = require('should');

describe('HDT parsing', function () {
  it('parse heading', function () {
    var msg = require("../nmea.js").parse("$IIHDT,234.2,T*25");
    msg.should.have.property('sentence', 'HDT');
    msg.should.have.property('heading', 234.2);
  });
});