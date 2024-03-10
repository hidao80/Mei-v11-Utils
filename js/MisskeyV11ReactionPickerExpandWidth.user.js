// ==UserScript==
// @name           Mei v11 Reaction Picker Expand Width
// @description    Widen the width of the reaction picker in Mei v11.
// @name:ja        リアクションパレットを画面下部に表示させる（めいv11 モバイル版モード用）
// @description:ja めいv11のリアクションピッカーの幅を画面いっぱいに広くします。
// @match          https://misskey.dev/*
// @match          http://hidao-hm90.local/*
// @author         hidao80
// @version        1.5.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11ReactionPickerExpandWidth
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44d.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyV11ReactionPickerExpandWidth(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyV11ReactionPickerExpandWidth';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    /** Main */
    const styles = [
        `div.popover.isMobile {
            position: fixed !important;
            top: auto !important;
            bottom: 0;
            left: 0 !important;
            transition: 0s;
            animation: none;
            transform: none !important;
            width: 100%;
        }`,
        `div.buttons {
            width: 100% !important;
            padding: 0;
        }`,
        // Widen the text box as much as possible.
        `div.popover.isMobile>.buttons>.text>input {
            flex: 1;
        }`,
        `div.popover.isMobile,
        div.popover.isMobile>.text,
        div.buttons div {
            width: 100% !important;
        }`,
    ];

    // Wait for content to complete loading.
    setTimeout(() => {
        const usableSheet = [...document.styleSheets].slice(-1)[0];

        for (let style of styles) {
            usableSheet.insertRule(style, usableSheet.cssRules.length);
        }
    }, 500);
};
