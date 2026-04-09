window.postMessage({ type: "GET_GOONTERVENTION_DATA" }, "*");

window.addEventListener("message", (event) => {
    if (event.data?.type === "GOONTERVENTION_DATA") {
        window.dispatchEvent(new CustomEvent("extension:data", {
            detail: event.data.payload
        }));
    }
});
