'use strict';

const { jsdom } = require('jsdom');
const { expect } = require('chai');

global.expect = expect;

global.createDom = function createDom() {
    const document = jsdom('<html><head></head><body></body></html>');
    
    global.window = document.defaultView;
    global.document = document;

    return function destroyDom() {
        global.window = undefined;
        global.document = undefined;
    };
};