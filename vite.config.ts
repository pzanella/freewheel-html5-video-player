import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    mode: "production",
    base: "/freewheel-html5-video-player/",
    build: {
        minify: true,
        modulePreload: false,
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                format: "es",
            },
        },
    },
    server: {
        open: "./index.html",
    },
    plugins: [
        mkcert(),
    ],
});
