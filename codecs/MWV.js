/*
 === MWV - Wind Speed and Angle ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5
 *******|   | |   | |
 $--MWV,x.x,a,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Wind Angle, 0 to 360 degrees
 2. Reference, R = Relative, T = True
 3. Wind Speed
 4. Wind Speed Units, K/M/N
 5. Status, A = Data Valid
 6. Checksum
 */

exports.decode = function(fields) {
  return {
    type: 'wind',
    angle: +fields[1],
    reference: fields[2],
    speed: +fields[3],
    units: fields[4],
    status: fields[5]
  }
}