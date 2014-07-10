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

    if (callback) {
      process.once('wifi_connect_complete', function(err, data){
        console.log("wifi_connect_complete hit");
        if (!err) {
          callback(err, JSON.parse(data));
        } else {
          callback(err, data);
        }
      });
    }
    
    process.on('wifi_connect_complete', function(err, data){
      if (!err) {
        self.emit('connect', err, JSON.parse(data))
      } else {
        self.emit('disconnect', err, data)
      }
    })
    
    // initiate connection
    var ret = hw.wifi_connect(options.ssid, options.password, options.security);

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

  self.isBusy = function(){
    return hw.wifi_is_busy();
  }

  self.connection = function() {
    var data = JSON.parse(hw.wifi_connection());
    if (data.connected) {
      return data;
    }
    return null;
  }

  self.reset = function() {
    // disable and then enable
    self.disable();
    self.enable();
    return self;
  }

  self.disable = function() {
    hw.wifi_disable();
    return self;
  }

  self.enable = function() {
    hw.wifi_enable();
    return self;
  }
}

util.inherits(Wifi, EventEmitter);

module.exports = new Wifi();