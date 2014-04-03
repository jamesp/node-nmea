var should = require('should');

describe('BWC ', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPBWC,220516,5130.02,N,00046.34,W,213.8,T,218.0,M,0004.6,N,EGLM*21");
    msg.should.have.property('type', '2waypoint');
    msg.should.have.property('sentence', 'BWC');
  });
});

