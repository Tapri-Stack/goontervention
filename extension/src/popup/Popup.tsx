import { useEffect, useState } from "react"

import "./Popup.css"

export const Popup = () => {
    const [count, setCount] = useState(0)

    const reloadGoonCount = async () => {
        const { goonCount } = await chrome.storage.local.get<{ goonCount: number }>(["goonCount"]);
        setCount(goonCount);
    }

    useEffect(() => {
        chrome.storage.onChanged.addListener((changes) => {
            if (changes) {
                reloadGoonCount();
            }
        });
        reloadGoonCount();
    }, [])

    return (
        <main>
            <h3>Gooned x{count}</h3>
        </main>
    )
}

export default Popup
