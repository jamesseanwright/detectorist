(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.detectorist = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const specialMappings = {
    get element() {
        return document.createElement('div');
    },

    get window() {
        return window;
    }
};

function isGroupSupported(isSupported, group) {
    const target = specialMappings[group.name] || window[group.name];
    const areMethodsSupported = areFeaturesSupported(target, group.methods, 'function');
    const arePropertiesSupported = areFeaturesSupported(target, group.properties);
    const areStylesSupported = target.style ? areFeaturesSupported(target.style, group.styles) : true;

    return isSupported && areMethodsSupported && areStylesSupported && arePropertiesSupported;
}

function areFeaturesSupported(target, expectedFeatures, expectedType) {
    if (!expectedFeatures) {
        return true;
    }

    return expectedFeatures.reduce((isSupported, item) => {
        const value = target[item];
        const doesTypeMatch = expectedType ? typeof value === expectedType : typeof value !== 'undefined';

        return isSupported && doesTypeMatch;
    }, true);
}

module.exports = function isBrowserSupported(featureConfig) {
    return featureConfig.reduce(isGroupSupported, true);
};
},{}]},{},[1])(1)
});