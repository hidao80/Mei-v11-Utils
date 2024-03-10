[
    "BuiltinMasumisuSearchforMisskeyDev",
    "FediverseTextBlur",
    "FediverseTimeToAbsolute",
    "MeiV11EmojisPaletteForMovileTextArea",
    "MisskeyDifferentColorLocalOnly",
    "MisskeyFediverseTicker",
    "MisskeyKeywordsFilter",
    "MisskeyNotesSpeech",
    "MisskeyReactionViewForTouchDevices",
    "MisskeyV11AddPostButtonAtBottom",
    "MisskeyV11BackToTop",
    "MisskeyV11CustomEmojiRender",
    "MisskeyV11ReactionPickerExpandWidth",
    "MisskeyV11RemoteCustomEmojiMarker",
    "MisskeyV11SendWithCtrlEnterForMobileMode",
].map(async src => {
    const isRun = (await chrome.storage.sync.get('ENABLE:' + src))['ENABLE:' + src];
    window[src](isRun);
});
