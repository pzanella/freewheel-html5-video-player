import MediaContent from "../media-content";

export interface IAdContent {
    adContainer: HTMLDivElement;
    videoElement: HTMLVideoElement;
    playerConfig: Record<PropertyKey, string | number>;
    mediaContent: MediaContent;
}

export type BaseEvent = {
    type: string;
    target: Context;
}

export type RequestCompleteEvent = BaseEvent & {
    success: boolean;
    response: Record<PropertyKey, any>;
};

export type SlotEvent = BaseEvent & {
    slot: Slot;
};

export type AdEvent = BaseEvent & {
    subType: string;
    adInstance: Record<PropertyKey, any>;
    slot: Record<PropertyKey, any>;
};

type TimePosition = "PREROLL" | "MIDROLL" | "POSTROLL";

export type Slot = {
    getTimePosition: () => void;
    getTimePositionClass: () => TimePosition;
    pause: () => void;
    play: <T>(value?: T) => void;
    resume: () => void;
};

export type Context = {
    setProfile: (profile: string) => void;
    setSiteSection: (siteSection: string) => void;
    setVideoAsset: (assetId: string | number, duration: number) => void;
    registerVideoDisplayBase: (containerId: string) => void;
    submitRequest: () => void;
    getTemporalSlots: () => Slot[];
    setVideoState: (state: number) => void;
    dispose: () => void;
    addEventListener: (eventName: string, callback?: (event?: any) => void) => void;
    removeEventListener: (eventName: string, callback?: (event?: any) => void) => void;
};
