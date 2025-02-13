"use strict";
{
    // Porting BY EMI INDO with c3addon-ide-plus

    globalThis.C3.Plugins.EMI_INDO_ConsentReset.Instance = class ConsentResetInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();


            if (properties) { }


            this._consentStatus = 0;
            this._userConsentData = "";
            this._itemName = "";
            this._expiresTime = "";
            this._errorCode = 0;
            this._eventResponse = "";

            const self = this;


        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        _loadFromJson(o) {
            // load state for savegames
        }


        async initConsentStatus() {
            const self = this;


            if (typeof cordova === 'undefined' || !consent) {

                return;
            }

            try {
                self._consentStatus = await consent.getConsentStatus();

                await consent.requestInfoUpdate(
                    {
                        status: self._consentStatus
                    });

                if (self._consentStatus === 3) {
                    self._eventResponse = "User consent obtained. Personalized vs non-personalized undefined.";
                    self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnConsentStstusObtained);
                }
            }
            catch (err) {
                self._eventResponse = "Consent Status error: " + err.message;
                self._errorCode = 1;
                self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnError);
            }
        }



        async setConsentReset(key, value, days, enabledRnTime) {
            const self = this;

            if (typeof cordova === 'undefined' || !consent) {
                return;
            }

            const existingItemStr = localStorage.getItem(key);
            if (existingItemStr !== null) {
                const itemData = await self.getItemWithExpiration(key);
                if (itemData !== null) {
                    self._itemName = itemData;
                    self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnConsentData);
                }


                if (enabledRnTime === 0) {
                    const remainingTime = await self.getRemainingTime(key);
                    if (remainingTime !== null) {

                        const result = self.convertMillisecondsToTime(remainingTime);
                        self._expiresTime = ("| Days: " + result.days + " | Hours: " + result.hours + " | Minutes: " + result.minutes + " | Seconds: " + result.seconds + " |");
                        self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnRemainingTime);

                    }
                }
                else {

                    self._expiresTime = ("remainingTime: Disabled");
                    self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnRemainingTime);

                }

            }


            const now = new Date();
            if (!existingItemStr || now.getTime() >= JSON.parse(existingItemStr).expiration) {
                const expirationTime = now.getTime() + days * 24 * 60 * 60 * 1000;
                const item = {
                    value: value,
                    expiration: expirationTime
                };
                localStorage.setItem(key, JSON.stringify(item));
            }
        }

        async getItemWithExpiration(key) {
            const self = this;
            const itemStr = localStorage.getItem(key);
            if (!itemStr) {
                return null;
            }

            const item = JSON.parse(itemStr);
            const now = new Date();
            if (now.getTime() > item.expiration) {
                try {
                    await consent.reset();
                    self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnConsentReset);
                }
                catch (error) {
                    self._eventResponse = "Error during consent reset: " + error;
                    self._errorCode = 2;
                    self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnError);
                }

                localStorage.removeItem(key);
                self._eventResponse = "Deleted the item from storage";
                self._trigger(globalThis.C3.Plugins.EMI_INDO_ConsentReset.Cnds.OnConsentDataExpired);
                return null;
            }

            return item.value;
        }

        async getRemainingTime(key) {
            const self = this;
            const itemStr = localStorage.getItem(key);
            if (!itemStr) {
                return null;
            }

            const item = JSON.parse(itemStr);
            const now = new Date();
            if (now.getTime() > item.expiration) {
                localStorage.removeItem(key);
                return null;
            }

            const remainingTime = item.expiration - now.getTime();
            return remainingTime > 0 ? remainingTime : null;
        }

        convertMillisecondsToTime(ms) {
            const millisecondsPerSecond = 1000;
            const millisecondsPerMinute = 60 * millisecondsPerSecond;
            const millisecondsPerHour = 60 * millisecondsPerMinute;
            const millisecondsPerDay = 24 * millisecondsPerHour;

            const days = Math.floor(ms / millisecondsPerDay);
            ms %= millisecondsPerDay;
            const hours = Math.floor(ms / millisecondsPerHour);
            ms %= millisecondsPerHour;
            const minutes = Math.floor(ms / millisecondsPerMinute);
            ms %= millisecondsPerMinute;
            const seconds = Math.floor(ms / millisecondsPerSecond);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };
        }

    };
}