const controller = "Pages";

function serializeQueryStringParameters(obj) {
    const s = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            s.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return s.join("&");
}

function getServiceFramework() {
    const sf = window.dnn.initPages().utility.sf;

    sf.moduleRoot = "PersonaBar/Host";
    sf.controller = controller;

    return sf;
}

const serviceFramework = {
    get(method, searchParameters) {
        const sf = getServiceFramework();
        return new Promise((callback, errorCallback) => {
            sf.get(method + "?" + serializeQueryStringParameters(searchParameters), {}, callback, errorCallback);
        });
    }
};

export default serviceFramework;