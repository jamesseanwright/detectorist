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

    return areMethodsSupported;
}

function isTypeSupported(target, expectedFeatures, expectedType) {
    if (!expectedFeatures) {
        return true;
    }

    return expectedFeatures.reduce((isSupported, item) => {
        const hasFeature = !!target[item];
        const doesFeatureConformToType = expectedType ? typeof target[item] === expectedType : true;

        return hasFeature && doesFeatureConformToType;
    }, true);
}

module.exports = function isBrowserSupported(featureConfig) {
    return featureConfig.reduce(isGroupSupported, true);
};