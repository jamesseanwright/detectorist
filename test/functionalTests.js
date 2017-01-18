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
});