# Detectorist

A configurable feature detection library that doesn't dirty the DOM.

## Why Another Feature Detection Library?

Most detection libraries expose an API for querying the availability of features as required:

```js
const areWorkersSupported = featureDetector.areWorkersSupported();
console.log(areWorkersSupported); // => true
```

Detectorist is different; one must provide a configuration of desired features, and these will be evaluated to return an overall result reflecting their support:

```js
'use strict';

const featureConfig = [
    {
        name: 'window',

        methods: [
            'CustomEvent'
        ]
    },

    {
        name: 'document',

        methods: [
            'querySelector'
        ]
    },
    
    {
        name: 'element',
        
        methods: [
            'querySelector'
        ],

        properties: [
            'outerHTML'
        ],

        styles: [
            'display',
            'textAlign'
        ]
    }
];

const isBrowserSupported = detectorist(featureConfig);
console.log(isBrowserSupported); // => true
```

The rationale behind this approach is to allow developers to specify which APIs a user's browser must support in order for it to be determined as suitable for one's web app or website.


## API

### `detectorist(featureConfig)`

Determines whether the environment in which this function is invoked is compliant with the specified `featureConfig`.

Returns:

* `true` - browser provides required features
* `false` - browser does not provides required features


#### `featureConfig`

The `featureConfig` parameter is an `Array` of configuration `Object`s that allows for the specification of features. The `name` property of the contained `Object`s can be:

* `window` - detects features on the global `window` object 
* `document` - detects features on the global `document` object 
* `element` - detects features on an instantiated `HTMLElement`

Any other value of the `name` property will conrespond to a property of the global `window` `Object`, although this behaviour needs further testing.

These objects can also contain these properties:

* `properties` - an array of `String`s determining the properties that should be supported
* `methods` - an array of `String`s determining the methods (read: properties whose `typeof === 'function'`) that should be supported

The `element` type also supports:

* `styles` - an array of camel-cased, standards-compliant `String`s representing the CSS features that should be supported


## Tests

This project was written with BDD and has Chrome browser tests, but this is pretty much a WIP.

## TODO

[ ] Minify
[ ] Transpile to ES5
[ ] Document local dev setup
[ ] Tests for other browsers
[ ] Publish