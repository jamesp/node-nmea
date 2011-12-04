// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

var parsers = {
    GGA: function(fields) {
        var FIX_TYPE = ['none', 'fix', 'delta'];
        return {
            type: 'fix',
            timestamp: fields[0],
            lat: fields[1],
            latPole: fields[2],
            lon: fields[3],
            lonPole: fields[4],
            fixType: FIX_TYPE[+fields[5]],
            numSat: +fields[6],
            horDilution: +fields[7],
            alt: +fields[8],
            altUnit: fields[9],
            geoidalSep: +fields[10],
            geoidalSepUnit: fields[11],
            differentialAge: +fields[12],
            differentialRefStn: fields[13],
            checksum: fields[14]
        };
    },
    GLL: function(fields) {
        return {
            type: 'geo-position',
            timestamp: fields[4],
            lat: fields[1],
            latPole: fields[2],
            lon: fields[3],
            lonPole: fields[4],
            status: fields[5] == 'A' ? 'valid' : 'invalid'
        };
    },
    RMC: function(fields) {
        return {
            type: 'nav-info',
            timestamp: fields[0],
            status: fields[1] == 'V' ? 'warning' : 'valid',
            lat: fields[2],
            latPole: fields[3],
            lon: fields[4],
            lonPole: fields[5],
            speedKnots: +fields[6],
            trackTrue: +fields[7],
            date: fields[8],
            variation: +fields[9],
            variationPole: fields[10],
            checksum: fields[11]
        };
    },
    VTG: function(fields) {
        return {
            type: 'track-info',
            trackTrue: +fields[0],
            trackMagnetic: +fields[2],
            speedKnots: +fields[4],
            speedKmph: +fields[6],
            checksum: fields[8]
        };
    },
    GSA: function(fields) {
      // $GPGSA,A,3,12,05,25,29,,,,,,,,,9.4,7.6,5.6
       var sats = [];
       for (var i=0; i < 12; i++) {
           if (fields[i+2]) sats.push(+fields[i+2]);
       };
       return {
          type: 'active-satellites',
          selectionMode: fields[0],
          mode: +fields[1],
          satellites: sats,
          PDOP: fields[14],
          HDOP: fields[15],
          VDOP: fields[16]
      };
    },
    GSV: function(fields) {
        // $GPGSV,3,1,12, 05,58,322,36, 02,55,032,, 26,50,173,, 04,31,085,
        var numRecords = (fields.length - 3) / 4,
            sats = [];
        for (var i=0; i < numRecords; i++) {
            var offset = i * 4 + 3;
            sats.push({id: fields[offset],
                       elevationDeg: +fields[offset+1],
                       azimuthTrue: +fields[offset+2],
                       SNRdB: +fields[offset+3]});
        };
        return {
            type: 'satellite-list-partial',
            numMsgs: +fields[0],
            msgNum: +fields[1],
            satsInView: +fields[2],
            satellites: sats
        };
    }
};

exports.parse = function(line) {
    var fields = line.split(',');
    if (fields[0].substr(0, 3) == '$GP') {
        var msg_fmt = fields[0].substr(3),
            parser = parsers[msg_fmt];
        if (parser) {
            return parser(fields.slice(1));            
        }
    }
};
