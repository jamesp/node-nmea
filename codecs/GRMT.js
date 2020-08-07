exports.ID = 'GRMT';
exports.TYPE = 'sensor-information';

exports.decode = function(fields) {
  /*
   === PGRMT - Garmin Proprietary Sensor Status Information ===

   The Garmin Proprietary sentence $PGRMT gives information concerning the status of a GPS sensor. This
   sentence is transmitted once per minute regardless of the selected baud rate. 
   
   ------------------------------------------------------------------------------
           1                               2 3 4 5 6 7  8 9
           |                               | | | | | |  | |
   $PGRMT,GPS19x-HVS Software Version 2.20,P,P,R,R,P,C,15,R*hh<CR><LF>
   ------------------------------------------------------------------------------

   Field Number:

   1. Product, model and software version (variable length field, e.g., “GPS 10 SW VER 2.01 BT VER 1.27 764”) 
   2. ROM checksum test, P = pass, F = fail 
   3. Receiver failure discrete, P = pass, F = fail 
   4. Stored data lost, R = retained, L = lost 
   5. Real time clock lost, R = retained, L = lost 
   6. Oscillator drift discrete, P = pass, F = excessive drift detected 
   7. Data collection discrete, C = collecting, null if not collecting
   8. GPS sensor temperature in degrees C 
   9. GPS sensor configuration data, R = retained, L = lost 
   
   Note: Some sensors have been seen to not provide all information above, in some cases just the product 
   model during boot. Example:
   
   $PGRMT,GPS19x-HVS Software Version 2.20,,,,,,,,*6F
   
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    product : fields[1],
    rom_checksum : fields[2],
    receiver_failure : fields[3],
    stored_data_lost : fields[4],
    rtc_lost: fields[5],
    oscillator_drift: fields[6],
    data_collection: fields[7],
    sensor_temperature: fields[8],
    sensor_configuration: fields[9]
  }
}
