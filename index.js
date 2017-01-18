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