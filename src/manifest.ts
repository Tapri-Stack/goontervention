import { defineManifest } from "@crxjs/vite-plugin"
import packageData from "../package.json"

//@ts-ignore
const isDev = process.env.NODE_ENV == "development"

export default defineManifest({
    name: `${packageData.displayName || packageData.name}`,
    description: packageData.description,
    version: packageData.version,
    manifest_version: 3,
    icons: {
        16: "icons/gooner.png",
        32: "icons/gooner.png",
        48: "icons/gooner.png",
        128: "icons/gooner.png",
    },
    action: {
        default_popup: "popup.html",
        default_icon: "icons/gooner.png",
    },
    background: {
        service_worker: "src/background/index.ts",
        type: "module",
    },
    web_accessible_resources: [
        {
            resources: ["icons/gooner.png"],
            matches: [],
        },
    ],
    permissions: ["tabs", "storage", "webNavigation"],
    host_permissions: ["*://youtube.com/*", "*://youtu.be/*", "https://goon.tapri.dev/*"],
})
