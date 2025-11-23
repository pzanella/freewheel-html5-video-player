import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    mode: "production",
    root: process.cwd(),
    base: "/freewheel-html5-video-player/",
    build: {
        minify: true,
        modulePreload: false,
        rollupOptions: {
            input: {
                bundle: path.resolve(__dirname, "./src/main.ts"),
                page: path.resolve(__dirname, "./index.html"),
            },
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
