chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId !== 0) return;
    if (details.tabId === -1) return;

    if (/.*(youtube|youtu.be).*/.test(details.url)) {
        const { goonCount } = await chrome.storage.local.get<{ goonCount: number }>(["goonCount"]);
        await chrome.storage.local.set({ goonCount: (goonCount || 0) + 1 });
        chrome.tabs.update(details.tabId, { url: "https://goon.tapri.dev" });
    }
});
