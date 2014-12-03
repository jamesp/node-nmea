var helpers = require("../helpers.js")
/*
 === HDT - Heading - True ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--HDT,x.x,T*hh
 ------------------------------------------------------------------------------

 Field Number:

 1) Heading Degrees, true
 2) T = True
 3) Checksum
 */
exports.TYPE = 'heading-info';
exports.ID = 'HDT';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: 'heading-info',
    heading: +fields[1]
  }
};