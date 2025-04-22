import AdContent from "./ad-content";
import { CONFIG } from "./config";
import MediaContent from "./media-content";
import { PlayerConfig } from "./model";

class Player {
    private _videoElement: HTMLVideoElement | null;
    private _adContainer: HTMLDivElement | null;
    private _buttonPlaybackElement: HTMLButtonElement | null;
    private _buttonMuteElement: HTMLButtonElement | null;

    constructor() {
        this._videoElement = document.querySelector("#container video#content");
        this._adContainer = document.querySelector("#container div#ad-container");
        this._buttonPlaybackElement = document.querySelector("#btn-play");
        this._buttonMuteElement = document.querySelector("#btn-mute");
    }

    public init(playerConfig: PlayerConfig): void {
        console.log("Player init method called");

        if (!this._videoElement || !this._adContainer) {
            console.error("Video element or ad container not found");
            return;
        }

        if (!playerConfig || !Object.hasOwn(playerConfig, "manifestUrl") || !Object.hasOwn(playerConfig, "assetId")) {
            console.error("Player config or manifest URL or assetId not provided");
            return;
        }

        const manifestUrl: URL = new URL(playerConfig.manifestUrl);
        const mediaContent: MediaContent = new MediaContent({ videoElement: this._videoElement, manifestUrl });
        const adContent: AdContent = new AdContent({ adContainer: this._adContainer, videoElement: this._videoElement, playerConfig, mediaContent });
        mediaContent.init();

        this._videoElement.addEventListener(
            "loadedmetadata",
            () => {
                adContent.init();
            },
            { once: true },
        );

        this._buttonPlaybackElement?.addEventListener("click", () => {
            if (this._buttonPlaybackElement) {
                if (this._buttonPlaybackElement.textContent === "PLAY") {
                    this._buttonPlaybackElement.textContent = "PAUSE";
                    adContent.play();
                } else {
                    this._buttonPlaybackElement.textContent = "PLAY";
                    adContent.pause();
                }
            }
        });

        this._buttonMuteElement?.addEventListener("click", () => {
            if (this._buttonMuteElement) {
                if (this._buttonMuteElement.textContent === "MUTE") {
                    this._buttonMuteElement.textContent = "UNMUTE";
                } else {
                    this._buttonMuteElement.textContent = "MUTE";
                }
                adContent.mute();
            }
        });
    }
}

const playerConfig: PlayerConfig = {
    assetId: CONFIG.ASSET_ID,
    manifestUrl: CONFIG.MANIFEST_URL,
};

const player: Player = new Player();
player.init(playerConfig);
