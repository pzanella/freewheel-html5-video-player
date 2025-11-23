import AdContent from "./ad-content";
import Controls from "./controls";
import Emitter from "./emitter";
import MediaContent from "./media-content";
import { CONTENT_TYPE, EVENTS, PLAYBACK_STATUS, PlayerConfig } from "./model";
import { setType } from "./store";
import store from "./store";
import { logger } from "./logger";

class Player extends Emitter {
    private _containerNode: HTMLDivElement | null;
    private _mediaContent!: MediaContent;
    private _adContent!: AdContent;

    constructor() {
        super();
        this._containerNode = document.querySelector("#container");
    }

    public init(playerConfig: PlayerConfig): void {
        logger.log("Player init method called", playerConfig);

        if (!this._containerNode) {
            logger.error("Container node not found");
            return;
        }

        if (!playerConfig || !Object.hasOwn(playerConfig, "manifestUrl") || !Object.hasOwn(playerConfig, "assetId")) {
            logger.error("Player config or manifest URL or assetId not provided");
            return;
        }

        const controls = new Controls(this._containerNode);
        controls.init();

        const _videoElement = document.querySelector("#container video#content") as HTMLVideoElement;
        const _adContainer = document.querySelector("#container div#ad-container") as HTMLDivElement;

        const manifestUrl: URL = new URL(playerConfig.manifestUrl);
        this._mediaContent = new MediaContent({ videoElement: _videoElement, manifestUrl });
        this._adContent = new AdContent({ adContainer: _adContainer, videoElement: _videoElement, playerConfig, mediaContent: this._mediaContent });
        this._mediaContent.init();

        this._mediaContent.once(EVENTS.VIDEO_LOADEDMETADATA, () => {
            this._adContent.init();
        });

        this._adContent.once(EVENTS.ADS_REQUEST_COMPLETE, () => {
            logger.log("ADS_REQUEST_COMPLETE event triggered");
            setType(CONTENT_TYPE.ADS);
            const currentStatus = store.getState().playbackStatus;
            if (currentStatus === PLAYBACK_STATUS.PLAYING) {
                logger.log("Auto-playing ads");
                this._adContent.play();
            }
        });

        // TODO: add ADS error event
        this._adContent.once([EVENTS.ADS_COMPLETE], () => {
            logger.log("ADS_COMPLETE event triggered");
            setType(CONTENT_TYPE.VOD);
            const currentStatus = store.getState().playbackStatus;
            if (currentStatus === PLAYBACK_STATUS.PLAYING) {
                logger.log("Auto-playing media content after ads");
                this._mediaContent.play();
            }
        });

        this._mediaContent.once(EVENTS.VIDEO_PLAYING, () => {
            setType(CONTENT_TYPE.VOD);
        });

        this._adContent.on(Object.entries(EVENTS).map(([_, value]) => value), (event: string) => {
            logger.log("AdContent event", event);
        });

        this._mediaContent.on(Object.entries(EVENTS).map(([_, value]) => value), (event: string) => {
            logger.log("MediaContent event", event);
        });

        store.subscribe(
            (state) => ({ type: state.type, status: state.playbackStatus }),
            ({ type, status }) => {
                if (type === CONTENT_TYPE.ADS) {
                    if (status === PLAYBACK_STATUS.PLAYING) {
                        this._adContent.play();
                    } else {
                        this._adContent.pause();
                    }
                } else if (type === CONTENT_TYPE.VOD) {
                    if (status === PLAYBACK_STATUS.PLAYING) {
                        this._mediaContent.play();
                    } else {
                        this._mediaContent.pause();
                    }
                }
            }
        );

        store.subscribe(
            (state) => ({ type: state.type, mute: state.mute }),
            ({ type, mute }) => {
                logger.log(`Mute state changed to ${mute} for ${type}`);
                if (type === CONTENT_TYPE.ADS) {
                    mute ? this._adContent.mute() : this._adContent.unmute();
                } else if (type === CONTENT_TYPE.VOD) {
                    mute ? this._mediaContent.mute() : this._mediaContent.unmute();
                }
            }
        );
    }
}

window.Player = Player;