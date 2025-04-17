import AdContent from "./ad-content";
import MediaContent from "./media-content";

const videoElement: HTMLVideoElement | null = document.querySelector("#container video#content");
const adContainer: HTMLDivElement | null = document.querySelector("#container div#ad-container");

const buttonPlaybackElement: HTMLButtonElement | null = document.querySelector("#btn-play");
const buttonMuteElement: HTMLButtonElement | null = document.querySelector("#btn-mute");

const videoConfig = {
    asset_id: 12345,
};
const manifestUrl: URL = new URL("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");

if (adContainer && videoElement) {
    const mediaContent: MediaContent = new MediaContent({ videoElement, manifestUrl });
    const adContent: AdContent = new AdContent({ adContainer, videoElement, videoConfig, mediaContent });
    mediaContent.init();

    videoElement.addEventListener(
        "loadedmetadata",
        () => {
            adContent.init();
        },
        { once: true },
    );

    buttonPlaybackElement?.addEventListener("click", () => {
        if (buttonPlaybackElement.textContent === "PLAY") {
            buttonPlaybackElement.textContent = "PAUSE";
            adContent.play();
        } else {
            buttonPlaybackElement.textContent = "PLAY";
            adContent.pause();
        }
    });

    buttonMuteElement?.addEventListener("click", () => {
        if (buttonMuteElement.textContent === "MUTE") {
            buttonMuteElement.textContent = "UNMUTE";
        } else {
            buttonMuteElement.textContent = "MUTE";
        }
        adContent.mute();
    });
}
