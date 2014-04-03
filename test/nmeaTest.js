var should = require('should');


describe('Encoding unknown', function () {
  it('undefined throws error', function () {
    var nmea = require("../nmea.js");
    (function(){
      nmea.encode(undefined);
    }).should.throw("Can not encode undefined, did you forget msg parameter?");
  });

  it('no type throws error', function () {
    var nmea = require("../nmea.js");
    (function(){
      nmea.encode('II', {type:"foo"});
    }).should.throw("No encoder for type:foo");
  });
});
