'use strict';

const featureConfig = require('./featureConfig.json');
const isBrowserSupported = require('../');

/* these tests verify the library's behaviour against
 * the sample featureConfig file. Seperate E2E tests are to be
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

    describe('window', function () {
        it('should return false if CustomEvent is missing', function () {
            window.CustomEvent = undefined;

            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });

        it('should return false if CustomEvent is not a function', function () {
            window.CustomEvent = {};
            
            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });
    });

    describe('document', function () {
        it('should return false if querySelector is missing', function () {
            document.querySelector = undefined;
            
            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });

        it('should return false if querySelector is not a function', function () {
            document.querySelector = {};
            
            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });
    });

    describe('HTMLElement', function () {
        it('should return false if querySelector is missing', function () {
            window.HTMLElement.prototype.querySelector = undefined;
            
            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });

        it('should return false if querySelector is not a function', function () {
            window.HTMLElement.prototype.querySelector = {};
            
            expect(isBrowserSupported(featureConfig)).to.equal(false);
        });

        it('should return false if the foo property is missing', function () {
            const fooConfig = [
                {
                    name: 'element',

                    properties: [
                        'foo'
                    ]
                }
            ];

            expect(isBrowserSupported(fooConfig)).to.equal(false);
        });

        it('should return false if the foo style property is missing', function () {
            const fooConfig = [
                {
                    name: 'element',

                    styles: [
                        'foo'
                    ]
                }
            ];

            expect(isBrowserSupported(fooConfig)).to.equal(false);
        });
    });
});