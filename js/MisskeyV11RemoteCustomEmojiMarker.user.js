// ==UserScript==
// @name        Misskey v11 Remote Custom Emoji Marker
// @name:ja     Misskey v11用リモートカスタム絵文字マーカー
// @description Make remote custom emoji reactions prominent in Misskey v11.
// @match       https://misskey.dev/*
// @match          http://hidao-hm90.local/*
// @author      hidao80
// @version     1.3.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11RemoteCustomEmojiMarker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// ==/UserScript==
//
// collaborators takimura

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
async function MisskeyV11RemoteCustomEmojiMarker(isRun) {
    if (!isRun) return;
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
    const SCRIPT_NAME = 'MisskeyV11RemoteCustomEmojiMarker';
    const HASH = ((s = SCRIPT_NAME)=>{var t=s.split("").map(v => {t=37*t+v.charCodeAt(0)});"h"+t.toString(16).replace(/0+$/,"")})();
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);

    const TRANSPARENT = 'rgba(0,0,0,0)';

    /**
     * Make the background color 100% transparent
     */
    function callback() {
        setTimeout(() => {
            const elems = $$all('.mk-reactions-viewer > span.reaction > img[title*="@"]:not([title$="@.:"]:not([transparent]))');
            if (elems?.length) {
                for (const elem of elems) {
                    const background = elem.parentElement;
                    if (background.style.backgroundColor != TRANSPARENT) {
                        background.style.backgroundColor = TRANSPARENT;
                        background.setAttribute('transparent', 'true');
                    }
                }
            }
        }, 500);
    }

    // Monitor whether emoji are drawn or not.
    (new MutationObserver(callback)).observe(document.body, { childList: true });
};
