import { IMediaContent } from "./model";

class MediaContent {
    private _videoElement: HTMLVideoElement;
    private _manifestUrl: URL;
    private _hls: typeof window.Hls;

    constructor({ videoElement, manifestUrl }: IMediaContent) {
        this._videoElement = videoElement;
        this._manifestUrl = manifestUrl;
        if (window.Hls.isSupported()) {
            console.log("HLS is supported!");
            this._hls = new window.Hls();
        } else {
            console.log("HLS not supported!");
        }
    }

    public init() {
        this._hls.loadSource(this._manifestUrl.toString());
        this._hls.attachMedia(this._videoElement);
        return this._hls;
    }

    public detach() {
        this._hls.detachMedia();
    }

    public async play() {
        await this._videoElement.play();
    }

    public pause() {
        this._videoElement.pause();
    }

    public set currentTime(time: number) {
        this._videoElement.currentTime = time;
    }

    public get currentTime() {
        return this._videoElement.currentTime;
    }

    public get duration() {
        return this._videoElement.duration;
    }
}

export default MediaContent;
