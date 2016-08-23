**[UNMAINTAINED] This library does not have a maintainer. The source code and repository will be kept at this URL indefinitely. If you'd like to help maintain this codebase, create an issue on this repo explaining why you'd like to become a maintainer and tag @tessel/maintainers in the body.**

wifi-cc3000
===========

This npm package is deprecated. The wifi-cc3000 lib is now included with Tessel's firmware; do not `npm install` this package.

The following should work out of the box on Tessel:

```
var wifi = require('wifi-cc3000');

console.log("is wifi connected? ", wifi.isConnected());
```

You can read more about Wifi on Tessel in the [Wifi docs](https://tessel.io/docs/wifi)
