// ==UserScript==
// @name        Misskey Fediverse Ticker
// @name:ja     Misskey fediverseティッカー
// @description Display the server to which the contributor belongs in an easily viewable manner.
// @match       https://misskey.dev/*
// @match          http://hidao-hm90.local/*
// @author      hidao80
// @version     1.7.3
// @namespace   https://github.com/hidao80/UserScript/MisskeyFediverseTicker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6a9.png
// @run-at      document-idle
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyFediverseTicker/MisskeyFediverseTicker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyFediverseTicker/MisskeyFediverseTicker.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyFediverseTicker(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyFediverseTicker';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    const CHARACTER = "abcdefghijklmnopqrstuvwxyz-_.,/?&%=[]0123456789";

    const styles = [
        `.${HASH} span {
            display: inline-block;
            color: #FFF;
            font-weight:600;
            padding: 0 0.5rem;
            margin-bottom: 0.25rem;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000;
        }`,
    ];

    for (let style of styles) {
        document.styleSheets[0].insertRule(style);
    }

    function showTicker(note) {
        const serverName = note.querySelector("a.name")?.getAttribute("href").split("@")[2] ?? location.hostname;
        const backgroundColor = (serverName.slice(0, 3) + serverName.slice(-3))
            .split("")
            .map((char) => parseInt(("0" + (CHARACTER.indexOf(char) % 16)).slice(-2)).toString(16))
            .join("");

        const ticker = $$new("div");
        ticker.className = HASH;
        ticker.innerHTML = `<span style="background-image: linear-gradient(transparent 20%, #${backgroundColor} 20%)">${serverName}</span>`;

        note.before(ticker);
    }

    function showTickerAll(column) {
        const notes = column.querySelectorAll(".main > header");
        for (const note of notes) {
            if (note.parentElement.querySelector(`.${HASH}`) === null) {
                showTicker(note);
            }
        }
    }

    // Sound when notifications come in.
    const timer = setInterval(() => {
        // Designation of lanes to watch for posts
        const columns = $$all(".transition");

        if (columns.length > 0) {
            clearInterval(timer);

            for (const column of columns) {
                new MutationObserver(() => showTickerAll(column)).observe(column, {
                    childList: true,
                });

                showTickerAll(column);
            }
        }
    }, 1_000);
};
