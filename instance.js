"use strict";
{
    // callMap path/SDK/instance.js

    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.EMI_INDO_ConsentReset;

    PLUGIN_CLASS.Instance = class ConsentResetInstance extends SDK.IInstanceBase {
        constructor(sdkType, inst) {
            super(sdkType, inst);
        }

        Release() { }

        OnCreate() { }

        OnPropertyChanged(id, value) { }

        LoadC2Property(name, valueString) {
            return false; // not handled
        }
    };
}