const { VITE_NETWORK_ID, VITE_SERVER_URL, VITE_PROFILE_ID, VITE_SITE_SECTION_ID } = import.meta.env;

export const CONFIG = {
    NETWORK_ID: VITE_NETWORK_ID,
    SERVER_URL: VITE_SERVER_URL,
    PROFILE_ID: VITE_PROFILE_ID,
    SITE_SECTION_ID: VITE_SITE_SECTION_ID,
    VIDEO_ELEMENT: {
        EVENTS: {
            TIMEUPDATE: "timeupdate",
            ENDED: "ended",
        }
    }
};