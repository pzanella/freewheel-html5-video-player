import { IMediaContent, videoElementEvents } from "./model";
import Emitter from "../emitter";
import { logger } from "../logger";

class MediaContent extends Emitter {
    private _videoElement: HTMLVideoElement;
    private _manifestUrl: URL;
    private _hls: typeof window.Hls;

    constructor({ videoElement, manifestUrl }: IMediaContent) {
        super();
        this._videoElement = videoElement;
        this._manifestUrl = manifestUrl;
        if (window.Hls.isSupported()) {
            logger.log("HLS is supported!");
            this._hls = new window.Hls();
        } else {
            logger.log("HLS not supported!");
        }
    }

    public init(): typeof window.Hls {
        this._hls.loadSource(this._manifestUrl.toString());
        this._hls.attachMedia(this._videoElement);
        this._eventListener();
        return this._hls;
    }

    public async play(): Promise<void> {
        await this._videoElement.play();
    }

    public pause(): void {
        this._videoElement.pause();
    }

    public set currentTime(time: number) {
        this._videoElement.currentTime = time;
    }

    public get currentTime(): number {
        return this._videoElement.currentTime;
    }

    public get duration(): number {
        return this._videoElement.duration;
    }

    public mute(): void {
        this._videoElement.muted = true;
    }

    public unmute(): void {
        this._videoElement.muted = false;
    }

    private _eventListener = () => {
        videoElementEvents.forEach((event) => {
            this._videoElement.addEventListener(event, () => {
                this.emit(event, { name: event });
            });
        });
    }
}

export default MediaContent;
