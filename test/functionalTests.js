'use strict';

const featureConfig = require('./featureConfig.json');
const isBrowserSupported = require('../');

describe('the isBrowserSupported functional tests', function () {
    let destroyDom;

    beforeEach(function () {
        destroyDom = createDom();
    });

    afterEach(function () {
        destroyDom();
    });

    it('should return true if a browser supports the configured features', function () {
        expect(isBrowserSupported(featureConfig)).to.equal(true);
    });

    it('should return false if the window.CustomEvent is missing', function () {
        delete window.CustomEvent;

        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });

    it('should return false if the window.CustomEvent is not a constructor function', function () {
        window.CustomEvent = {};
        
        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });
});