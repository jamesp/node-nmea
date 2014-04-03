var should = require('should');

describe('DBT parsing', function () {
  it('parses feet and meters', function () {
    var msg = require("../nmea.js").parse("$IIDBT,036.41,f,011.10,M,005.99,F*25");
    msg.should.have.property('sentence', 'DBT');
    msg.should.have.property('type', 'depth-transducer');
    msg.should.have.property('depthFeet', 36.41);
    msg.should.have.property('depthMeters', 11.10);
  });
});

describe('DBT encoding', function () {
  it('encodes ok', function () {
    var nmeaMsg = require("../nmea.js").encode('II', {
      type: 'depth-transducer',
      depthFeet: 36.41,
      depthFathoms: 5.99,
      depthMeters: 11.10
    });
    nmeaMsg.should.equal("$IIDBT,36.41,f,11.10,M,5.99,F*25");
  });
});