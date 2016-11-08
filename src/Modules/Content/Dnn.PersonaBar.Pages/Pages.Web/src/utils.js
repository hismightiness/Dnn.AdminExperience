let utilities = null;
let config = null;
let moduleName = null;
let initialized = false;

function init(options) {
    if (!options) {
        throw new Error("This method needs to have an options object as an input parameter");
    }
    if (!options.utilities) {
        throw new Error("This method needs to have an options.utilities object as an input parameter");
    }
    if (!options.config) {
        throw new Error("This method needs to have an options.config object as an input parameter");
    }
    if (!options.moduleName) {
        throw new Error("This method needs to have an options.moduleName string as an input parameter");
    }
    utilities = options.utilities;  
    config = options.config; 
    moduleName = options.moduleName;
    initialized = true;   
}

function checkInit() {
    if (!initialized) {
        throw new Error("Utils have not been initialized");
    }
}

function formatDateNoTime(date) {
    checkInit();
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString(config.culture, dateOptions);
}

function formatNumeric(value) {
    checkInit();
    return value.toLocaleString(config.culture);
}

function formatNumeric2Decimals(value) {
    return parseFloat(Math.round(value * 100) / 100).toFixed(2);
}

function notify(message) {
    checkInit();
    return utilities.notify(message);
}

function notifyError(message) {
    checkInit();
    return utilities.notifyError(message);
}

function confirm(message, confirmText, cancelText, confirmHandler, cancelHandler) {
    checkInit();
    return utilities.confirm(message, confirmText, cancelText, confirmHandler, cancelHandler);
}

function getServiceFramework() {
    checkInit();
    return utilities.sf;
}

function getUtilities() {
    checkInit();
    return utilities;
}

function getModuleName() {
    checkInit();
    return moduleName;
}

function getResx(moduleName, key) {
    checkInit();
    return utilities.getResx(moduleName, key);
}

const utils = {
    init,
    formatDateNoTime,
    formatNumeric,
    formatNumeric2Decimals,
    notify,
    notifyError,
    confirm,
    getServiceFramework,
    getUtilities,
    getModuleName,
    getResx
};

export default utils;