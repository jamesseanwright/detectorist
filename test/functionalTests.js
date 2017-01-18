'use strict';

const featureConfig = require('./featureConfig.json');
const isBrowserSupported = require('../');

/* these tests verify the library's behaviour against
 * the sample featureConfig file. Seperate tests are to be
 * written for actual browsers. */
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
        window.CustomEvent = undefined;

        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });

    it('should return false if the window.CustomEvent is not a function', function () {
        window.CustomEvent = {};
        
        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });

    it('should return false if document.querySelector is missing', function () {
        document.querySelector = undefined;
        
        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });

    it('should return false if document.querySelector is not a function', function () {
        document.querySelector = {};
        
        expect(isBrowserSupported(featureConfig)).to.equal(false);
    });
});