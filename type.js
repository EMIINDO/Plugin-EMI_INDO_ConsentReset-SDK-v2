"use strict";
{
    const SDK = globalThis.SDK;

    const PLUGIN_CLASS = SDK.Plugins.EMI_INDO_ConsentReset;

    PLUGIN_CLASS.Type = class ConsentResetType extends SDK.ITypeBase {
        constructor(sdkPlugin, iObjectType) {
            super(sdkPlugin, iObjectType);
        }
    };
}