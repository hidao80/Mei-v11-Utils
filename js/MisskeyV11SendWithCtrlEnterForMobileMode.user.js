// ==UserScript==
// @name           Misskey v11 Send With Ctrl Enter For Mobile Mode
// @description    When in mobile view of Misskey ver.11, Ctrl+Enter can be used to post a NOTE.
// @name:ja        Ctrl+Enterで送信する（Misskey v11 モバイル版モード用）
// @description:ja Misskey ver.11のモバイルビューで、Ctrl+EnterでNOTEを投稿できるようにしました。
// @match          https://misskey.dev/*
// @match          http://hidao-hm90.local/*
// @author         hidao80
// @version        1.2.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11SendWithCtrlEnterForMobileMode
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e8.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyV11SendWithCtrlEnterForMobileMode(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyV11SendWithCtrlEnterForMobileMode';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    /** Main */
    document.body.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") {
            $$one('button[class="submit"]')?.click();
        } else if (e.key === "Escape") {
            $$one('button[class="cancel"]')?.click();
        }
    });
};
