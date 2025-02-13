"use strict";
// Porting BY EMI INDO with c3addon-ide-plus
{
    const SDK = globalThis.SDK;

    const PLUGIN_ID = "EMI_INDO_ConsentReset";
    // callMap Deprecated const PLUGIN_VERSION = "2.0.0.0";
    const PLUGIN_CATEGORY = "monetisation";

    const PLUGIN_CLASS = SDK.Plugins.EMI_INDO_ConsentReset = class ConsentResetPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(globalThis.lang(".name"));
            this._info.SetDescription(globalThis.lang(".description"));
            // callMap Deprecated this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("EMI_INDO");
            this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
            this._info.SetIsSingleGlobal(true);
            this._info.SetCanBeBundled(true);

            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([

            ]);

            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}