const inject = () => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injected.ts");
    document.documentElement.appendChild(script);
};

inject();

window.addEventListener("message", async (event) => {
    if (event.source !== window) return;
    if (event.data?.type !== "GET_GOONTERVENTION_DATA") return;

    const data = await chrome.storage.local.get(null);

    window.postMessage({
        type: "GOONTERVENTION_DATA",
        payload: data
    }, "*");
});
