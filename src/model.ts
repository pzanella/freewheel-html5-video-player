declare global {
    interface Window {
        tv: any;
        Hls: any;
    }
}

export type PlayerConfig = {
    assetId: number | string;
    manifestUrl: string;
};

export enum CONTENT_TYPE {
    ADS = "ADS",
    VOD = "VOD"
};

export enum PLAYBACK_STATUS {
    PLAYING = "playing",
    PAUSED = "paused"
};

export enum EVENTS {
    READY = "ready",
    ADS_REQUEST_INITIATED = "onRequestInitiated",
    ADS_REQUEST_COMPLETE = "onRequestComplete",
    ADS_SLOT_STARTED = "onSlotStarted",
    ADS_INITIATED = "adInitiated",
    ADS_PRE_INIT = "preInit",
    ADS_BUFFERING_START = "adBufferingStart",
    ADS_BUFFERING_END = "adBufferingEnd",
    ADS_IMPRESSION = "defaultImpression",
    ADS_FIRST_QUARTILE = "firstQuartile",
    ADS_MIDPOINT = "midPoint",
    ADS_THIRD_QUARTILE = "thirdQuartile",
    ADS_COMPLETE = "adEnd",
    ADS_CLICK = "click",
    ADS_PAUSE = "_pause",
    ADS_RESUME = "_resume",
    ADS_SLOT_ENDED = "onSlotEnded",
    VIDEO_PLAY = "play",
    VIDEO_PAUSE = "pause",
    VIDEO_PLAYING = "playing",
    VIDEO_ENDED = "ended",
    VIDEO_WAITING = "waiting",
    VIDEO_CANPLAY = "canplay",
    VIDEO_CANPLAYTHROUGH = "canplaythrough",
    VIDEO_LOADEDMETADATA = "loadedmetadata",
    VIDEO_LOADEDDATA = "loadeddata",
    VIDEO_PROGRESS = "progress",
    VIDEO_SEEKING = "seeking",
    VIDEO_SEEKED = "seeked",
    VIDEO_TIMEUPDATE = "timeupdate",
    VIDEO_VOLUMECHANGE = "volumechange",
    VIDEO_ERROR = "error"
}

export type Store = {
    type: CONTENT_TYPE;
    playbackStatus: PLAYBACK_STATUS;
};