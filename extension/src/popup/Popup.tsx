import { useEffect, useState } from "react"

import "./Popup.css"

export const Popup = () => {
    const [count, setCount] = useState(0)

    const reloadTodayCount = async () => {
        const { todayCount } = await chrome.storage.local.get<{ todayCount?: number }>(["todayCount"])
        setCount(todayCount || 0)
    }

    useEffect(() => {
        chrome.storage.onChanged.addListener((changes) => {
            if (changes) {
                reloadTodayCount()
            }
        })
        reloadTodayCount()
    }, [])

    return (
        <main>
            <a href={process.env.NODE_ENV == "development" ? "http://localhost:5174" : "https://goon.tapri.dev"} target="_blank">
                <div>Gooned</div>
                <div className="large">X{count}</div>
            </a>
        </main>
    )
}

export default Popup
