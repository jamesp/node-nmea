// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

var MWV = require('./codecs/MWV.js');
var VTG = require('./codecs/VTG.js');
var DBT = require('./codecs/DBT.js');
var GLL = require('./codecs/GLL.js');
var BWC = require('./codecs/BWC.js');
var GSV = require('./codecs/GSV.js');
var GSA = require('./codecs/GSA.js');
var GGA = require('./codecs/GGA.js');
var RMC = require('./codecs/RMC.js');
var APB = require('./codecs/APB.js');
var HDT = require('./codecs/HDT.js');
var HDM = require('./codecs/HDM.js');
var RDID = require('./codecs/RDID.js');


// export helpers
module.exports.Helpers= require('./helpers.js');

var validLine = function (line) {
  // check that the line passes checksum validation
  // checksum is the XOR of all characters between $ and * in the message.
  // checksum reference is provided as a hex value after the * in the message.
  var checkVal = 0;
  var parts = line.split('*');
  for (var i = 1; i < parts[0].length; i++) {
    checkVal = checkVal ^ parts[0].charCodeAt(i);
  }
  ;
  return checkVal == parseInt(parts[1], 16);
};

exports.traditionalDecoders = {
  GGA: GGA.decode,
  RMC: RMC.decode,
  APB: APB.decode,
  GSA: GSA.decode,
  GSV: GSV.decode,
  BWC: BWC.decode,
  DBT: DBT.decode,
  MWV: MWV.decode,
  VTG: VTG.decode,
  GLL: GLL.decode,
  HDT: HDT.decode,
  HDM: HDM.decode,
  RDID: RDID.decode,
};

exports.encoders = new Object();

exports.encoders[MWV.TYPE] = MWV;
exports.encoders[VTG.TYPE] = VTG;
exports.encoders[DBT.TYPE] = DBT;
exports.encoders[GLL.TYPE] = GLL;
exports.encoders[HDT.TYPE] = HDT;
exports.encoders[GGA.TYPE] = GGA;
exports.encoders[HDM.TYPE] = HDM;

exports.parse = function (line) {
  if (validLine(line)) {
    var fields = line.split('*')[0].split(','),
      talker_id,
      msg_fmt;
    if (fields[0].charAt(1) == 'P') {
      talker_id = 'P'; // Proprietary
      msg_fmt = fields[0].substr(2);
    } else {
      talker_id = fields[0].substr(1, 2);
      msg_fmt = fields[0].substr(3);
    }
    var parser = exports.traditionalDecoders[msg_fmt];
    if (parser) {
      var val = parser(fields);
      val.talker_id = talker_id;
      return val;
    } else {
      throw Error("Error in parsing:" + line);
    }
  } else {
    throw Error("Invalid line:" + line);
  }
};

exports.encode = function (talker, msg) {
  if (typeof msg === 'undefined') {
    throw new Error("Can not encode undefined, did you forget msg parameter?");
  }
  encoder = exports.encoders[msg.type];
  if (encoder) {
    return encoder.encode(talker, msg);
  } else {
    throw Error("No encoder for type:" + msg.type);
  }
}

exports.createDefaultTransformer = function (options) {
  var stream = require('through')(function (data) {
    try {
      stream.queue(exports.parse(data));
    } catch (e) {
    }
  });
  return stream;
};

