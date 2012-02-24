// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

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
    GGA: function(fields) {
        var FIX_TYPE = ['none', 'fix', 'delta'];
        return {
            type: 'fix',
            timestamp: fields[1],
            lat: fields[2],
            latPole: fields[3],
            lon: fields[4],
            lonPole: fields[5],
            fixType: FIX_TYPE[+fields[6]],
            numSat: +fields[7],
            horDilution: +fields[8],
            alt: +fields[9],
            altUnit: fields[10],
            geoidalSep: +fields[11],
            geoidalSepUnit: fields[12],
            differentialAge: +fields[13],
            differentialRefStn: fields[14],
        };
    },
    GLL: function(fields) {
        return {
            type: 'geo-position',
            timestamp: fields[5],
            lat: fields[2],
            latPole: fields[3],
            lon: fields[4],
            lonPole: fields[5],
            status: fields[6] == 'A' ? 'valid' : 'invalid'
        };
    },
    RMC: function(fields) {
        return {
            type: 'nav-info',
            timestamp: fields[1],
            status: fields[2] == 'V' ? 'warning' : 'valid',
            lat: fields[3],
            latPole: fields[4],
            lon: fields[5],
            lonPole: fields[6],
            speedKnots: +fields[7],
            trackTrue: +fields[8],
            date: fields[9],
            variation: +fields[10],
            variationPole: fields[11],
            checksum: fields[12]
        };
    },
    VTG: function(fields) {
        return {
            type: 'track-info',
            trackTrue: +fields[1],
            trackMagnetic: +fields[3],
            speedKnots: +fields[5],
            speedKmph: +fields[7],
            checksum: fields[9]
        };
    },
    GSA: function(fields) {
      // $GPGSA,A,3,12,05,25,29,,,,,,,,,9.4,7.6,5.6
       var sats = [];
       for (var i=1; i < 13; i++) {
           if (fields[i+2]) sats.push(+fields[i+2]);
       };
       return {
          type: 'active-satellites',
          selectionMode: fields[1],
          mode: +fields[2],
          satellites: sats,
          PDOP: fields[15],
          HDOP: fields[16],
          VDOP: fields[17]
      };
    },
    GSV: function(fields) {
        // $GPGSV,3,1,12, 05,58,322,36, 02,55,032,, 26,50,173,, 04,31,085,
        var numRecords = (fields.length - 4) / 4,
            sats = [];
        for (var i=0; i < numRecords; i++) {
            var offset = i * 4 + 4;
            sats.push({id: fields[offset],
                       elevationDeg: +fields[offset+1],
                       azimuthTrue: +fields[offset+2],
                       SNRdB: +fields[offset+3]});
        };
        return {
            type: 'satellite-list-partial',
            numMsgs: +fields[1],
            msgNum: +fields[2],
            satsInView: +fields[3],
            satellites: sats
        };
    }
};

exports.parse = function(line) {
    if (validLine(line)) {
        var fields = line.split('*')[0].split(','),
            talker_id = fields[0].substr(1, 2),
            msg_fmt = fields[0].substr(3),
            parser = exports.parsers[msg_fmt];
        if (parser) {
            var val = parser(fields);
            val.talker_id = talker_id;
            return val;   
        }
    }
};
