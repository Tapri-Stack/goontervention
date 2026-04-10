import { defineManifest } from "@crxjs/vite-plugin"
import packageData from "../package.json"
import constants from "./constants.json"

//@ts-ignore
const isDev = process.env.NODE_ENV == "development"

export default defineManifest({
    name: `${packageData.displayName || packageData.name}`,
    description: packageData.description,
    version: packageData.version,
    manifest_version: 3,
    icons: {
        16: "stare.png",
        32: "stare.png",
        48: "stare.png",
        128: "stare.png",
    },
    action: {
        default_popup: "popup.html",
        default_icon: "stare.png",
    },
    background: {
        service_worker: "src/background/index.ts",
        type: "module",
    },
    content_scripts: [
        {
            matches: [isDev ? "http://localhost:5174/*" : "https://goon.tapri.dev/*"],
            js: ["src/content/index.ts"],
        },
    ],
    externally_connectable: {
        matches: [isDev ? "http://localhost:5174/*" : "https://goon.tapri.dev/*"],
    },
    web_accessible_resources: [
        {
            resources: ["stare.png"],
            matches: [],
        },
        {
            resources: ["injected.ts"],
            matches: [isDev ? "http://localhost:5174/*" : "https://goon.tapri.dev/*"]
        }
    ],
    permissions: ["tabs", "storage", "webNavigation"],
    host_permissions: [...constants.goonerList.map((url) => `*://${url}/*`), isDev ? "http://localhost:5174/*" : "https://goon.tapri.dev/*"]
})
