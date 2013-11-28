#!/usr/bin/env node

var lineReader = require('line-reader');
var nmea = require('../nmea.js');

lineReader.eachLine(process.argv[2], function(line, last) {
  var sentence = nmea.parse(line);
  if (sentence !== undefined) {
    console.log(sentence);
  } else {
    console.error("Parse error:" + line);
  }
  return !last;
});