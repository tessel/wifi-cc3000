var wifi = require('../');

function tryConnect(){
  if (!wifi.isBusy()) {
    console.log("not busy");
    connect();
  } else {
    console.log("is busy, trying again");
    setTimeout(function(){
      tryConnect();
    }, 1000);
  } 
}


function connect(){
  wifi.connect({
    security: "wpa2"
    , ssid: "#######"
    , password: "#######"
  }, function(err, data){
    console.log("got callback", err, data);
    console.log("connection data", wifi.connection()); // should return json data
    console.log("is connected", wifi.isConnected()); // should be true
    console.log("disable wifi");
    wifi.disable();
    console.log("is connected", wifi.isConnected()); // should be false
    console.log("connection data", wifi.connection()); // should be null

    // renable + reconnect
    wifi.enable();
    tryConnect();
  });
}

wifi.on('connect', function(err, data){
  console.log("connect emittied", err, data);
});

wifi.on('disconnect', function(err, data){
  console.log("disconnect emittied", err, data);
})

tryConnect();

process.ref();