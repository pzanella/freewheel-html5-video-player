import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    mode: "production",
    root: process.cwd(),
    base: "/dist/",
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
        // host: "local.video.sky.it",
        open: "./index.html",
    },
    plugins: [
        mkcert(),
    ],
});
