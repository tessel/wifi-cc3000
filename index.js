var util = require('util');
var EventEmitter = require('events').EventEmitter;

var hw = process.binding('hw');


function bufferConvert() {
}

function Wifi(){
  var self = this;

  if (Wifi.instance) {
    return Wifi.instance;
  }
  else {
    Wifi.instance = this;
  }

  self.connect = function(options, callback){
    // options consists of 
    // { ssid: 
    //   , password: optional only if security == "unsecured"
    //   , security: defaults to wpa2 
    //   , timeout: defaults to 60s
    // }

    options.security = (options.security && options.security.toLowerCase()) || "wpa2";
    options.timeout = Number.parseInt(options.timeout) || 60;

    if (!options || !options.ssid) {
      throw Error("No SSID given");
    }

    if (!options.password && options.security != "unsecured") {
      throw Error("No password given for a network with security type", options.security);
    }

    self._connectOpts = options;

    process.once('wifi_connect_complete', function(err, data){
      console.log("wifi_connect_complete hit");
      if (!err) {
        callback(err, JSON.parse(data));
      } else {
        callback(err, data);
      }
    });

    // initiate connection
    var ret = hw.wifi_connect(options.ssid.length, options.password.length, 
      options.security.length, options.ssid, options.password, options.security);

    if (ret < 0) {
      process.removeListener('wifi_connect_complete', callback);

      if (callback) {
        callback(new Error("Previous wifi connect is in the middle of a call"));
      } else {
        new Error("Previous wifi connect is in the middle of a call");
      }
    }

    return self;
  }

  self.isConnected = function() {
    return hw.wifi_is_connected();
  }

  self.connection = function() {
    return hw.wiif_connection();
  }

  self.reset = function(callback) {
    hw.wifi_reset();
    // something something set up the callback here
    return self;
  }

  self.disable = function(callback) {
    hw.wifi_disable();
    return self;
  }

  self.enable = function(callback) {
    hw.wifi_enable();
    return self;
  }
}

util.inherits(Wifi, EventEmitter);

module.exports = new Wifi();