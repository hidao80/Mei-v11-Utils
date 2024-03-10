import { $$all } from "./lib/utils.js";
import { i18nInit } from "./lib/i18n.js";

/**
 * Code to be executed upon completion of form loading
 */
document.addEventListener("DOMContentLoaded", () => {
    i18nInit();

    [...$$all('input[type="checkbox"]')].map(async v => {
        const index = "ENABLE:" + v.id;
        let isEnable = (await chrome.storage.sync.get(index))[index] ?? v.dataset.default;
        console.debug(isEnable);
        if (isEnable) {
            v.setAttribute("checked", "checked");
            await chrome.storage.sync.set({[index]: true});
        } else {
            v.removeAttribute("checked");
            await chrome.storage.sync.set({[index]: false});
        }

        v.addEventListener("change", async e => {
            const index = 'ENABLE:' + e.target.id;
            const bool = (await chrome.storage.sync.get(index))[index];
            console.debug(index, bool);
            await chrome.storage.sync.set({[index]: !bool});
        });
    });
});
