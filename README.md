wifi-cc3000
===========

This npm package is deprecated. The wifi-cc3000 lib is now included with Tessel's firmware; do not `npm install` this package.

The following should work out of the box on Tessel:

```
var wifi = require('wifi-cc3000');

console.log("is wifi connected? ", wifi.isConnected());
```

You can read more about Wifi on Tessel in the [Wifi docs](https://tessel.io/docs/wifi)
