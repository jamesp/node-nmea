var helpers = require("../helpers.js")

/*
 === HDG - Magnetic heading, deviation, variation ===

 ------------------------------------------------------------------------------
        1   2  3  4  5 6
        |   |  |  |  | |
$--HDG,x.x,x.x,a,x.x,a*hh
 ------------------------------------------------------------------------------

 Field Number:

1) Magnetic Sensor heading in degrees
2) Magnetic Deviation, degrees
3) Magnetic Deviation direction, E = Easterly, W = Westerly
4) Magnetic Variation degrees
5) Magnetic Variation direction, E = Easterly, W = Westerly
6) Checksum
 
 */
exports.TYPE = 'heading-deviation-variation';
exports.ID = 'HDG';

exports.decode = function (fields) {
    console.log(fields);
  return {
    sentence: exports.ID,
    type: 'heading-deviation-variation',
    heading: +fields[1],
    deviation: +fields[2],
    deviationDirection: fields[3],
    variation: +fields[4],
    variationDirection: fields[5]
  }
};