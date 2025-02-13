"use strict";
{
    globalThis.C3.Plugins.EMI_INDO_ConsentReset.Acts = {
        async GetConsentStatus()
        {

            if (typeof cordova === 'undefined' || !consent)
            {

                return;
            }

            await this.initConsentStatus();
        },

        async ConsentReset(key, value, days, enabledRnTime)
        {
            if (typeof cordova === 'undefined' || !consent)
            {

                return;
            }

            await this.setConsentReset(key, value, days, enabledRnTime);
        }
    };
}