import constants from "../constants.json"

const changeIcon = (iconName: string, resetAfter: number) => {
    chrome.action.setIcon({ path: iconName })

    setTimeout(() => {
        chrome.action.setIcon({ path: "stare.png" })
    }, resetAfter)
}

chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (!new RegExp(`.*(${constants.goonerList.join('|')}).*`).test(details.url)) {
        const wasAboutToGoon = (await chrome.storage.local.get<{ aboutToGoon?: boolean }>(["aboutToGoon"])).aboutToGoon || false

        if (!wasAboutToGoon) {
            return
        }

        chrome.storage.local.set({ aboutToGoon: false })
        changeIcon("omedetu.png", 2000)
    }

    if (details.frameId !== 0 || details.tabId === -1) {
        chrome.storage.local.set({ aboutToGoon: true })
        changeIcon("stare.png", 2000)
        return
    }

    chrome.storage.local.set({ aboutToGoon: false })
    changeIcon("caught.png", 2000)

    const { todayCount } = await chrome.storage.local.get<{ todayCount?: number }>(["todayCount"])
    await chrome.storage.local.set({ todayCount: (todayCount || 0) + 1 })
    chrome.tabs.update(details.tabId, { url: process.env.NODE_ENV == "development" ? "http://localhost:5174" : "https://goon.tapri.dev" })
})
