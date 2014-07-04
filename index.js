var util = require('util');
var EventEmitter = require('events').EventEmitter;

var tm = process.binding('tm');
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

    // initiate connection

    return self;
  }

  self.isConnected = function() {
    return hw.cc_is_connected();
  }

  self.connection = function() {
    return hw.cc_connection();
  }

  self.reset = function(callback) {
    hw.cc_reset();
    // something something set up the callback here
    return self;
  }

  self.disable = function(callback) {
    hw.cc_disable();
    return self;
  }

  self.enable = function(callback) {
    hw.cc_enable();
    return self;
  }
}

util.inherits(Wifi, EventEmitter);

module.exports = new Wifi();