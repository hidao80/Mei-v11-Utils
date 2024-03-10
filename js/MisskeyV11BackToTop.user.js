// ==UserScript==
// @name        Back to top for Misskey v11
// @name:ja     Misskey v11向け先頭に戻るボタン追加
// @description Summary of this script
// @match       https://misskey.dev/*
// @match          http://hidao-hm90.local/*
// @author      hidao80
// @version     1.2.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11BackToTop
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b06.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyV11BackToTop(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyV11BackToTop';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    // The deck mode originally has a function to go back to the top of the list, so it does nothing.
    if (JSON.parse(localStorage.getItem('vuex')).device.deckMode) {
        return;
    }

    const TOP_ANCHOR_ID = 'home_timeline_top';

    // Create a element a with a link to the top
    const button = $$new("a");
    button.classList.add(HASH, 'pagetop');
    button.href = "#" + TOP_ANCHOR_ID;

    // Create a div element to display the link
    const div = $$new("div");
    div.classList.add(HASH, 'pagetop__arrow');

    const theme = JSON.parse(localStorage.getItem('theme'));
    const styles = [
        `.content.top {
            scroll-behavior: smooth;
            padding-top: 4em;
            margin-top: -4em;
        }`,
        `div.tl {
            scroll-behavior: smooth;
            padding-top: 4em;
            margin-top: -4em;
        }`,
        `.${HASH}.pagetop {
            height: 50px;
            width: 50px;
            position: fixed;
            right: 30px;
            bottom: 30px;
            background: ${theme.primary};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1030;
        }`,
        `.${HASH}.pagetop__arrow {
            height: 10px;
            width: 10px;
            border-top: 3px solid ${theme.primaryForeground};
            border-right: 3px solid ${theme.primaryForeground};
            transform: translateY(20%) rotate(-45deg);
        }`
    ];

    // Processing starts after the timeline has been drawn.
    setTimeout(() => {
        // There is no element with an ID representing the beginning, so add an ID.
        const tareget = $$one('div.tl') ?? $$one('.content.top');
        tareget.id = TOP_ANCHOR_ID;

        // Add the created element to the screen
        button.appendChild(div);
        document.body.appendChild(button);

        // Style is a later winner, so send and add
        const usableSheet = [...document.styleSheets].slice(-1)[0];

        for (let style of styles) {
            usableSheet.insertRule(style, usableSheet.cssRules.length);
        }
    }, 1_500);
};
