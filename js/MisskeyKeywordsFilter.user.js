// ==UserScript==
// @name        Misskey Keywords Filter
// @name:ja     Misskey キーワードフィルター
// @description Filter out offensive words in Misskey.
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match          http://hidao-hm90.local/*
// @match       https://misskey.noellabo.jp/*
// @match       https://msky.work/*
// @author      hidao80
// @version     1.5.3
// @namespace   https://github.com/hidao80/UserScript/MisskeyKeywordsFilter
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26d4.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyKeywordsFilter(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyKeywordsFilter';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    const FILTERED_WORDS = "■■■";
    const KEYWORDS = [
        // User defined keywords

        // Default keywords
        "馬鹿",
        "バカ",
        "ﾊﾞｶ",
        "うんこ",
        "ウンコ",
        "ｳﾝｺ",
        "くそ",
        "クソ",
        "ｸｿ",
        "fuck",
        "f*ck",
        "fu*k",
        "f**k",
        "shit",
        "sh*t",
        "s*it",
        "s**t",
    ];

    /**
     * Replace all keywords
     * @param {string} text target string
     * @return {string} replaced text
     */
    function replace(text) {
        for (const word of KEYWORDS) {
            text = text.replaceAll(word, FILTERED_WORDS);
        }
        return text;
    }

    // Style is a later winner, so send and add
    const timer = setInterval(() => {
        // Designation of lanes to watch for posts
        var parentElment = [...document.querySelectorAll(".header")].find(
            v => /ソーシャル/.test(v.textContent)
        )?.parentElement.parentElement;

        if (parentElment) {
            clearInterval(timer);

            // Filter out offensive remarks on social networking sites.
            function filter() {
                // MFM takes a while to draw, so wait a bit.
                setTimeout(() => {
                    for (const elem of parentElment.querySelectorAll(".text>.havbbuyv,.cw>.havbbuyv")) {
                        // Displayed text
                        elem.innerHTML = replace(elem.innerHTML);

                        // Text not shown (used by MisskeyNotesSpeech)
                        elem.setAttribute("text", replace(elem.getAttribute("text")));
                    }
                }, 100);
            }

            // Call the read function when a post is added.
            const targetLane = parentElment.querySelector(".transition.notes") ?? parentElment.querySelector(".transition");
            (new MutationObserver(filter)).observe(targetLane, { childList: true });
        }
    }, 300);
};
