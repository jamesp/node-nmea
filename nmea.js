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


var validLine = function(line) {
    // check that the line passes checksum validation
    // checksum is the XOR of all characters between $ and * in the message.
    // checksum reference is provided as a hex value after the * in the message.
    var checkVal = 0;
    var parts = line.split('*');
    for (var i=1; i < parts[0].length; i++) {
        checkVal = checkVal ^ parts[0].charCodeAt(i);
    };
    return checkVal == parseInt(parts[1], 16);
};

exports.parsers = {
    GGA: GGA.decode,
    RMC: RMC.decode,
    APB: function(fields) {
/*
=== APB - Autopilot Sentence "B" ===

                                         13    15
------------------------------------------------------------------------------
        1 2 3   4 5 6 7 8   9 10   11  12|   14|
        | | |   | | | | |   | |    |   | |   | |
 $--APB,A,A,x.x,a,N,A,A,x.x,a,c--c,x.x,a,x.x,a*hh<CR><LF>
------------------------------------------------------------------------------

Field Number: 

1. Status
     V = LORAN-C Blink or SNR warning
     V = general warning flag or other navigation systems when a reliable
         fix is not available
2. Status
     V = Loran-C Cycle Lock warning flag
     A = OK or not used
3. Cross Track Error Magnitude
4. Direction to steer, L or R
5. Cross Track Units, N = Nautical Miles
6. Status
     A = Arrival Circle Entered
7. Status
     A = Perpendicular passed at waypoint
8. Bearing origin to destination
9. M = Magnetic, T = True
10. Destination Waypoint ID
11. Bearing, present position to Destination
12. M = Magnetic, T = True
13. Heading to steer to destination waypoint
14. M = Magnetic, T = True
15. Checksum
*/
        return {
            type: 'autopilot-b',
            status1 : fields[1],
            status2 : fields[2],
            xteMagn : +fields[3],
            steerDir : fields[4],
            xteUnit : fields[5],
            arrivalCircleStatus : fields[6],
            arrivalPerpendicularStatus : fields[7],
            bearingOrig2Dest : +fields[8],
            bearingOrig2DestType : fields[9],
            waypoint : fields[10],
            bearing2Dest : +fields[11],
            bearingDestType : fields[12],
            heading2steer : +fields[13],
            headingDestType : fields[14]
        }
    },
  GSA: GSA.decode,
  GSV: GSV.decode,
  BWC: BWC.decode,
  DBT: DBT.decode,
  MWV: MWV.decode,
  VTG: VTG.decode,
  GLL: GLL.decode
};

exports.encoders = new Object();

exports.encoders[MWV.TYPE] = MWV;
exports.encoders[VTG.TYPE] = VTG;
exports.encoders[DBT.TYPE] = DBT;
exports.encoders[GLL.TYPE] = GLL;

exports.parse = function(line) {
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
        parser = exports.parsers[msg_fmt];
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

exports.encode = function(talker, msg) {
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
