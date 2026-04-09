import { useEffect, useState } from "react"
import { GoonCard } from "./GoonCard"

export function App() {
    const name = "N1ps"
    const [data, setData] = useState<undefined | { todayCount?: number; lifetimeCount?: number }>(undefined)

    useEffect(() => {
        window.addEventListener("extension:data", (event) => {
            setData((event as CustomEvent<{ todayCount?: number; lifetimeCount?: number }>).detail)
        })
    })

    return (
        <div className="flex items-center justify-center min-h-svh p-6">
            <GoonCard name={name} todayCount={data?.todayCount || 0} lifetimeCount={data?.lifetimeCount || 0} />
        </div>
    )
}

export default App
