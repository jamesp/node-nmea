var helpers = require("../helpers.js")
/*
 === HDT - Heading from True Notrht ===

 ------------------------------------------------------------------------------
 *******1   2 
 *******|   | 
 $--MWV,x.x,T,<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Heading in degrees
 2. T: Indicates heading relative to True North
 3. Checksum
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