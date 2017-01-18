'use strict';

const featureConfig = require('./featureConfig.json');
const detectorist = require('../');

/* these tests verify the library's behaviour against
 * the sample featureConfig file. Seperate E2E tests are
 * being written for actual browsers. */
describe('the detectorist functional tests', function () {
    let destroyDom;

    beforeEach(function () {
        destroyDom = createDom();
    });

    afterEach(function () {
        destroyDom();
    });

    it('should return true if a browser supports the configured features', function () {
        expect(detectorist(featureConfig)).to.equal(true);
    });

    describe('window', function () {
        it('should return false if CustomEvent is missing', function () {
            window.CustomEvent = undefined;

            expect(detectorist(featureConfig)).to.equal(false);
        });

        it('should return false if CustomEvent is not a function', function () {
            window.CustomEvent = {};
            
            expect(detectorist(featureConfig)).to.equal(false);
        });
    });

    describe('document', function () {
        it('should return false if querySelector is missing', function () {
            document.querySelector = undefined;
            
            expect(detectorist(featureConfig)).to.equal(false);
        });

        it('should return false if querySelector is not a function', function () {
            document.querySelector = {};
            
            expect(detectorist(featureConfig)).to.equal(false);
        });
    });

    describe('HTMLElement', function () {
        it('should return false if querySelector is missing', function () {
            window.HTMLElement.prototype.querySelector = undefined;
            
            expect(detectorist(featureConfig)).to.equal(false);
        });

        it('should return false if querySelector is not a function', function () {
            window.HTMLElement.prototype.querySelector = {};
            
            expect(detectorist(featureConfig)).to.equal(false);
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

            expect(detectorist(fooConfig)).to.equal(false);
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

            expect(detectorist(fooConfig)).to.equal(false);
        });
    });
});