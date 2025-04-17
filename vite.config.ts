import legacy from "@vitejs/plugin-legacy";
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
                page: path.resolve(__dirname, "./index.hbbtv.html"),
            },
            output: {
                entryFileNames: "[name].js",
                format: "iife",
            },
        },
    },
    server: {
        host: "local.video.sky.it",
        open: "./index.html",
    },
    plugins: [
        mkcert(),
        legacy({
            targets: ["Chrome >= 36"],
            renderModernChunks: false,
            renderLegacyChunks: true,
        }),
        {
            name: "html-transform",
            transformIndexHtml: (html) => {
                return html.replace("<!DOCTYPE html>", '<!DOCTYPE html PUBLIC "-//HbbTV//1.1.1//EN" "http://www.hbbtv.org/dtd/HbbTV-1.1.1.dtd">');
            },
        },
    ],
});
