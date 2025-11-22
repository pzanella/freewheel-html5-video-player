import Emitter from "../emitter";
import MediaContent from "../media-content";
import { CONFIG } from "./config";
import { AdEvent, BaseEvent, Context, IAdContent, RequestCompleteEvent, Slot, SlotEvent } from "./model";

class AdContent extends Emitter {
    private _videoElement: HTMLVideoElement;
    private _videoConfig: Record<PropertyKey, string | number>;
    private _mediaContent: MediaContent;
    private _adManager: typeof window.tv.freewheel;
    private _adContext: Context | null = null;
    private _slots: Map<string, Slot>;
    private _isFirstPlaying: boolean = false;
    private _currentSlot: Slot | undefined = undefined;
    private _adContainerElement: HTMLDivElement;
    private _adVideoElement: HTMLVideoElement;

    constructor({ adContainer, videoElement, playerConfig, mediaContent }: IAdContent) {
        super();
        this._videoElement = videoElement;
        this._videoConfig = playerConfig;
        this._slots = new Map();
        this._mediaContent = mediaContent;
        this._adContainerElement = adContainer;
        this._adVideoElement = adContainer.querySelector("video") as HTMLVideoElement;

        this.onContentTimeUpdate = this.onContentTimeUpdate.bind(this);
        this.onSlotEnded = this.onSlotEnded.bind(this);
        this.onRequestComplete = this.onRequestComplete.bind(this);
        this.onContentPauseRequest = this.onContentPauseRequest.bind(this);
        this.onContentResumeRequest = this.onContentResumeRequest.bind(this);
        this.onContentVideoEnded = this.onContentVideoEnded.bind(this);
    }

    public init(): void {
        this._adManager = new window.tv.freewheel.SDK.AdManager();
        this._adManager.setNetwork(CONFIG.NETWORK_ID);
        this._adManager.setServer(CONFIG.SERVER_URL);
        this._adContext = this._adManager.newContext();
        this._adContext?.setProfile(CONFIG.PROFILE_ID);
        this._adContext?.setSiteSection(CONFIG.SITE_SECTION_ID);
        this._adContext?.setVideoAsset(this._videoConfig.assetId, this._mediaContent.duration); // FIXME: video duration is necessary?

        // Let context object knows where to render the ad, using the id of a div containing a video element
        this._adContext?.registerVideoDisplayBase("ad-container");

        this.requestAds();
        this.addEventListener();
        this.addContentVideoListeners();
    }

    private requestAds(): void {
        /** Add custom target key
         * EXAMPLE:
         * this._adContext?.addKeyValue("skippable", "enabled");
         */

        /** Register exstensions
         * EXAMPLE:
         * this._adContext?.setParameter("extension.skippableAd.enabled", true, window.tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
         */

        // Submit ad request
        this._adContext?.submitRequest();
    }

    private onRequestComplete(event: RequestCompleteEvent): void {
        const { success } = event;
        if (success) {
            const temporalSlots = this._adContext?.getTemporalSlots();
            temporalSlots?.forEach((slot: Slot) => {
                const position = slot.getTimePositionClass();

                // FIXME: handle multiple slots using a Map
                this._slots.set(position, slot);
            });
            this._currentSlot = this._slots.get(window.tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL);
        } else {
            console.warn("onRequestComplete error", event);
        }
    }

    private onSlotStarted(): void {
        this._adContainerElement.style.display = "block";
        this._adContainerElement.style.zIndex = "1";
        this._mediaContent.pause();
    }

    private async onSlotEnded(event: SlotEvent): Promise<void> {
        this._isFirstPlaying = false;

        // FIXME: manage multiple prerolls, midrolls, or postrolls when are present
        if (event.slot.getTimePositionClass() === window.tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL) {
            this.dispose();
        } else {
            this._adContainerElement.style.display = "none";
            this._adContainerElement.style.zIndex = "-1";
            await this.playContent();
        }
    }

    private onContentPauseRequest(): void {
        this._adContext?.setVideoState(window.tv.freewheel.SDK.VIDEO_STATE_PAUSED);
    }

    private onContentResumeRequest(): void {
        this._adContext?.setVideoState(window.tv.freewheel.SDK.VIDEO_STATE_PLAYING);
    }

    private async playContent(): Promise<void> {
        this._adContext?.setVideoState(window.tv.freewheel.SDK.VIDEO_STATE_PLAYING);
        await this._mediaContent.play();
    }

    public play(): void {
        if (!this._currentSlot) {
            console.warn("No slot to play");
            return;
        }

        if (!this._isFirstPlaying) {
            this._currentSlot.play();
            this._isFirstPlaying = true;
        } else {
            this._currentSlot.resume();
        }
    }

    public pause(): void {
        if (!this._currentSlot) {
            console.warn("No slot to pause");
            return;
        }
        this._currentSlot.pause();
    }

    public mute(): void {
        this._adVideoElement.muted = !this._adVideoElement.muted;
        this._adVideoElement.volume = this._adVideoElement.muted ? 0 : 0.25;
    }

    private onContentTimeUpdate(): void {
        const slot = this._slots.get(window.tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL);
        const position = slot?.getTimePosition();
        const videoCurrentTime = this._mediaContent.currentTime;
        // FIXME: manage when exceeding the position value to avoid losing the midroll
        if (position && Math.floor(videoCurrentTime) === position) {
            this._mediaContent.currentTime = Math.ceil(videoCurrentTime);
            this._currentSlot = slot;
            this.play();
        }
    }

    private onContentVideoEnded(): void {
        this._adContext?.setVideoState(window.tv.freewheel.SDK.VIDEO_STATE_COMPLETED);
        const slot = this._slots.get(window.tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL);
        this._currentSlot = slot;
        this.play();
    }

    private addContentVideoListeners(): void {
        this._videoElement.addEventListener(CONFIG.VIDEO_ELEMENT.EVENTS.TIMEUPDATE, this.onContentTimeUpdate);
        this._videoElement.addEventListener(CONFIG.VIDEO_ELEMENT.EVENTS.ENDED, this.onContentVideoEnded);
    }

    public addEventListener(): void {
        // FIXME: error events are missing
        const EVENTS = window.tv.freewheel.SDK;
        const events = Object.entries(EVENTS).reduce((previous: any, [key, value]) => {
            if (key.startsWith("EVENT_")) {
                previous.push(value);
            }
            return previous;
        }, []);

        events.forEach((eventName: string) => {
            switch (eventName) {
                case EVENTS.EVENT_CONTENT_VIDEO_PAUSE_REQUEST:
                    this._adContext?.addEventListener(EVENTS.EVENT_CONTENT_VIDEO_PAUSE_REQUEST, (payload: SlotEvent) => {
                        this.emit(EVENTS.EVENT_CONTENT_VIDEO_PAUSE_REQUEST, payload);
                        this.onContentPauseRequest();
                    });
                    break;
                case EVENTS.EVENT_CONTENT_VIDEO_RESUME_REQUEST:
                    this._adContext?.addEventListener(EVENTS.EVENT_CONTENT_VIDEO_RESUME_REQUEST, (payload: SlotEvent) => {
                        this.emit(EVENTS.EVENT_CONTENT_VIDEO_RESUME_REQUEST, payload);
                        this.onContentResumeRequest();
                    });
                    break;
                case EVENTS.EVENT_REQUEST_COMPLETE:
                    this._adContext?.addEventListener(EVENTS.EVENT_REQUEST_COMPLETE, (payload: RequestCompleteEvent) => {
                        this.emit(EVENTS.EVENT_REQUEST_COMPLETE, payload);
                        this.onRequestComplete(payload);
                    });
                    break;
                case EVENTS.EVENT_SLOT_STARTED:
                    this._adContext?.addEventListener(EVENTS.EVENT_SLOT_STARTED, (payload: SlotEvent) => {
                        this.emit(EVENTS.EVENT_SLOT_STARTED, payload);
                        this.onSlotStarted();
                    });
                    break;
                case EVENTS.EVENT_SLOT_ENDED:
                    this._adContext?.addEventListener(EVENTS.EVENT_SLOT_ENDED, (payload: SlotEvent) => {
                        this.emit(EVENTS.EVENT_SLOT_ENDED, payload);
                        this.onSlotEnded(payload);
                    });
                    break;
                default:
                    this._adContext?.addEventListener(eventName, (payload: BaseEvent | AdEvent | SlotEvent) => this.emit(eventName, payload));
            }
        });
    }

    private dispose(): void {
        if (this._adContext) {
            this._adContext.removeEventListener(window.tv.freewheel.SDK.EVENT_REQUEST_COMPLETE, this.onRequestComplete);
            this._adContext.removeEventListener(window.tv.freewheel.SDK.EVENT_SLOT_STARTED, this.onSlotStarted);
            this._adContext.removeEventListener(window.tv.freewheel.SDK.EVENT_SLOT_ENDED, this.onSlotEnded);
            this._adContext.removeEventListener(window.tv.freewheel.SDK.EVENT_CONTENT_VIDEO_PAUSE_REQUEST, this.onContentPauseRequest);
            this._adContext.removeEventListener(window.tv.freewheel.SDK.EVENT_CONTENT_VIDEO_RESUME_REQUEST, this.onContentResumeRequest);
            this._adContext.dispose();
            this._adContext = null;
            this._adVideoElement.src = "";
            this._mediaContent.destroy();
        }
    }
}

export default AdContent;
