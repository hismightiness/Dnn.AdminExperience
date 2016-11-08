﻿#region Copyright
// 
// DotNetNuke® - http://www.dotnetnuke.com
// Copyright (c) 2002-2016
// by DotNetNuke Corporation
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions 
// of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
// TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

#endregion

using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dnn.PersonaBar.Library;
using Dnn.PersonaBar.Library.Attributes;
using Dnn.PersonaBar.Servers.Components.PerformanceSettings;
using Dnn.PersonaBar.Servers.Services.Dto;
using DotNetNuke.Common;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Controllers;
using DotNetNuke.Entities.Host;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Instrumentation;
using DotNetNuke.Web.Api;
using DotNetNuke.Web.Client;
using static System.Boolean;

namespace Dnn.PersonaBar.Servers.Services
{
    [ServiceScope(Scope = ServiceScope.Host)]
    public class ServerSettingsPerformanceController : PersonaBarApiController
    {
        private static readonly ILog Logger = LoggerSource.Instance.GetLogger(typeof(ServerSettingsPerformanceController));
        private readonly PerformanceController _performanceController = new PerformanceController();

        /// GET: api/Servers/GetPerformanceSettings
        /// <summary>
        /// Gets performance settings
        /// </summary>
        /// <param></param>
        /// <returns>performance settings</returns>
        [HttpGet]
        public HttpResponseMessage GetPerformanceSettings()
        {
            try
            {
                var portalId = PortalSettings.Current.PortalId;
                var perfSettings = new
                {
                    CachingProvider = _performanceController.GetCachingProvider(),
                    PageStatePersistence = Host.PageStatePersister,
                    ModuleCacheProvider = Host.ModuleCachingMethod,
                    PageCacheProvider = Host.PageCachingMethod,
                    CacheSetting = Host.PerformanceSetting,
                    AuthCacheability = Host.AuthenticatedCacheability,
                    UnauthCacheability = Host.UnauthenticatedCacheability,
                    SslForCacheSynchronization = Host.UpgradeForceSsl,
                    ClientResourcesManagementMode = PortalController.GetPortalSetting("ClientResourcesManagementMode", portalId, "h"),

                    CurrentHostVersion = Host.CrmVersion.ToString(CultureInfo.InvariantCulture),
                    HostEnableCompositeFiles = Host.CrmEnableCompositeFiles,
                    HostMinifyCss = Host.CrmMinifyCss,
                    HostMinifyJs = Host.CrmMinifyJs,
                    CurrentPortalVersion = GetPortalVersion(portalId),
                    PortalEnableCompositeFiles = Parse(PortalController.GetPortalSetting(ClientResourceSettings.EnableCompositeFilesKey, portalId, "false")),
                    PortalMinifyCss = Parse(PortalController.GetPortalSetting(ClientResourceSettings.MinifyCssKey, portalId, "false")),
                    PortalMinifyJs = Parse(PortalController.GetPortalSetting(ClientResourceSettings.MinifyJsKey, portalId, "false")),

                    // Options
                    CachingProviderOptions = _performanceController.GetCachingProviderOptions(),
                    PageStatePersistenceOptions = _performanceController.GetPageStatePersistenceOptions(),
                    ModuleCacheProviders = _performanceController.GetModuleCacheProviders(),
                    PageCacheProviders = _performanceController.GetPageCacheProviders(),
                    CacheSettingOptions = _performanceController.GetCacheSettingOptions(),
                    AuthCacheabilityOptions = _performanceController.GetCacheabilityOptions(),
                    UnauthCacheabilityOptions = _performanceController.GetCacheabilityOptions()
                };
                return Request.CreateResponse(HttpStatusCode.OK, perfSettings);
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }

        private int GetPortalVersion(int portalId)
        {
            var settingValue = PortalController.GetPortalSetting(ClientResourceSettings.VersionKey, portalId, "0");
            int version;
            if (int.TryParse(settingValue, out version))
            {
                if (version == 0)
                {
                    version = 1;
                    PortalController.UpdatePortalSetting(portalId, ClientResourceSettings.VersionKey, "1", true);
                }
            }

            return version;
        }

        /// POST: api/Servers/UpdatePerformanceSettings
        /// <summary>
        /// Updates performance settings
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage UpdatePerformanceSettings(UpdatePerfSettingsRequest request)
        {
            try
            {
                HostController.Instance.Update("AuthenticatedCacheability", request.AuthCacheability, false);
                HostController.Instance.Update("UnauthenticatedCacheability", request.UnauthCacheability, false);
                HostController.Instance.Update("PageStatePersister", request.PageStatePersistence);
                HostController.Instance.Update("ModuleCaching", request.ModuleCacheProvider, false);
                if (_performanceController.GetPageCacheProviders().Any())
                {
                    HostController.Instance.Update("PageCaching", request.PageCacheProvider, false);
                }
                HostController.Instance.Update("PerformanceSetting", request.CacheSetting, false);
                Host.PerformanceSetting = (Globals.PerformanceSettings)Enum.Parse(typeof(Globals.PerformanceSettings), request.CacheSetting);
                DataCache.ClearCache();

                return Request.CreateResponse(HttpStatusCode.OK, new { Success = true });
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }
    }
}