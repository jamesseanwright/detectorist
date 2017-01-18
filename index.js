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
    const areMethodsSupported = isTypeSupported(target, group.methods, 'function');
    const arePropertiesSupported = isTypeSupported(target, group.properties);
    const areStylesSupported = target.style ? isTypeSupported(target.style, group.styles) : true;

    return areMethodsSupported && areStylesSupported && arePropertiesSupported;
}

function isTypeSupported(target, expectedFeatures, expectedType) {
    if (!expectedFeatures) {
        return true;
    }

    return expectedFeatures.reduce((isSupported, item) => {
        const value = target[item];

        return expectedType ? typeof value === expectedType : typeof value !== 'undefined';
    }, true);
}

module.exports = function isBrowserSupported(featureConfig) {
    return featureConfig.reduce(isGroupSupported, true);
};