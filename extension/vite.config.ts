import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin"
import react from "@vitejs/plugin-react"

import manifest from "./src/manifest"

export default defineConfig(({ mode }) => {
    return {
        server: {
            port: 5173,
            cors: true,
        },
        strictPort: true,
        hmr: {
            protocol: "ws",
            host: "localhost",
            port: 5173
        },
        build: {
            emptyOutDir: true,
            outDir: "build",
            rollupOptions: {
                output: {
                    chunkFileNames: "assets/chunk-[hash].js",
                },
            },
        },
        plugins: [crx({ manifest }), react()],
        legacy: {
            skipWebSocketTokenCheck: true,
        },
    }
})
