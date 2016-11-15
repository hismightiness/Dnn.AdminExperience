import util from "../utils";
function serializeQueryStringParameters(obj) {
    let s = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            s.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return s.join("&");
}
class ApplicationService {
    getServiceFramework(controller) {
        let sf = util.utilities.sf;

        sf.moduleRoot = "PersonaBar";
        sf.controller = controller;

        return sf;
    }

    getPortalSettings(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetPortalSettings?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    }    

    updatePortalSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdatePortalSettings", payload, callback, failureCallback);
    }

    getDefaultPagesSettings(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetDefaultPagesSettings?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    }    

    updateDefaultPagesSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateDefaultPagesSettings", payload, callback, failureCallback);
    }

    getMessagingSettings(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetMessagingSettings?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    }    

    updateMessagingSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateMessagingSettings", payload, callback, failureCallback);
    }

    getProfileSettings(portalId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetProfileSettings?portalId=" + portalId, {}, callback);
    }    

    updateProfileSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateProfileSettings", payload, callback, failureCallback);
    }

    getProfileProperties(portalId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetProfileProperties?portalId=" + portalId, {}, callback);
    }  

    getProfileProperty(propertyId, portalId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetProfileProperty?propertyId=" + propertyId + "&portalId=" + portalId, {}, callback);
    } 

    getProfilePropertyLocalization(propertyName, propertyCategory, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetProfilePropertyLocalization?propertyName=" + propertyName + "&propertyCategory=" + propertyCategory + "&cultureCode=" + cultureCode, {}, callback);
    }  

    updateProfileProperty(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateProfileProperty", payload, callback, failureCallback);
    } 

    addProfileProperty(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("AddProfileProperty", payload, callback, failureCallback);
    } 

    deleteProfileProperty(propertyId, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("DeleteProfileProperty?propertyId=" + propertyId + "&portalId=", {}, callback, failureCallback);
    } 

    updateProfilePropertyLocalization(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateProfilePropertyLocalization", payload, callback, failureCallback);
    } 

    getUrlMappingSettings(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetUrlMappingSettings?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    }  

    getSiteAliases(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetSiteAliases?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    } 

    updateUrlMappingSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateUrlMappingSettings", payload, callback, failureCallback);
    }

    getSiteAlias(aliasId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetSiteAlias?portalAliasId=" + aliasId, {}, callback);
    } 

    addSiteAlias(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("AddSiteAlias", payload, callback, failureCallback);
    }

    updateSiteAlias(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateSiteAlias", payload, callback, failureCallback);
    }

    deleteSiteAlias(aliasId, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("DeleteSiteAlias?portalAliasId=" + aliasId, {}, callback, failureCallback);
    } 

    getBasicSearchSettings(callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetBasicSearchSettings", {}, callback);
    } 

    updateBasicSearchSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateBasicSearchSettings", payload, callback, failureCallback);
    }

    compactSearchIndex(callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("CompactSearchIndex", {}, callback, failureCallback);
    }

    hostSearchReindex(callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("HostSearchReindex", {}, callback, failureCallback);
    }

    portalSearchReindex(portalId, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("PortalSearchReindex?portalId=" + portalId, {}, callback, failureCallback);
    }

    getSynonymsGroups(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetSynonymsGroups?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    } 

    addSynonymsGroup(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("AddSynonymsGroup", payload, callback, failureCallback);
    }

    updateSynonymsGroup(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateSynonymsGroup", payload, callback, failureCallback);
    }

    deleteSynonymsGroup(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("DeleteSynonymsGroup", payload, callback, failureCallback);
    } 

    getIgnoreWords(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetIgnoreWords?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    } 

    addIgnoreWords(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("AddIgnoreWords", payload, callback, failureCallback);
    }

    updateIgnoreWords(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateIgnoreWords", payload, callback, failureCallback);
    }

    deleteIgnoreWords(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("DeleteIgnoreWords", payload, callback, failureCallback);
    } 

    getLanguageSettings(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetLanguageSettings?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    } 

    updateLanguageSettings(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateLanguageSettings", payload, callback, failureCallback);
    }

    getLanguages(portalId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetLanguages?portalId=" + portalId + "&cultureCode=" + cultureCode, {}, callback);
    } 

    getLanguage(portalId, languageId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetLanguage?portalId=" + portalId + "&languageId=" + languageId, {}, callback);
    } 

    getAllLanguages(callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetAllLanguages", {}, callback);
    } 

    addLanguage(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("AddLanguage", payload, callback, failureCallback);
    }

    updateLanguage(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateLanguage", payload, callback, failureCallback);
    }

    updateLanguageRoles(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("UpdateLanguageRoles", payload, callback, failureCallback);
    }

    verifyLanguageResourceFiles(callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("VerifyLanguageResourceFiles", {}, callback);
    } 

    getModuleList(type, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetModuleList?type=" + type, {}, callback);
    } 

    createLanguagePack(payload, callback, failureCallback) {
        const sf = this.getServiceFramework("SiteSettings");
        sf.post("CreateLanguagePack", payload, callback, failureCallback);
    }

    getCultureList(portalId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetCultureList?portalId=" + portalId, {}, callback);
    }

    getRoleGroups(portalId, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetTranslatorRoleGroups?portalId=" + portalId, {}, callback);
    } 

    getRoles(portalId, groupId, cultureCode, callback) {
        const sf = this.getServiceFramework("SiteSettings");        
        sf.get("GetTranslatorRoles?portalId=" + portalId + "&groupId=" + groupId + "&cultureCode=" + cultureCode, {}, callback);
    } 
}
const applicationService = new ApplicationService();
export default applicationService;