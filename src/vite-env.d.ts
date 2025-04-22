/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NETWORK_ID: number;
    readonly VITE_SERVER_URL: string;
    readonly VITE_PROFILE_ID: string;
    readonly VITE_SITE_SECTION_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
