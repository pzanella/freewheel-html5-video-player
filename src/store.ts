import { createStore } from "zustand/vanilla";
import { CONTENT_TYPE, PLAYBACK_STATUS, Store } from "./model";
import { subscribeWithSelector } from "zustand/middleware";

const getInitialState = (): Store => ({
    type: CONTENT_TYPE.VOD,
    playbackStatus: PLAYBACK_STATUS.PAUSED,
    mute: false,
});

const store = createStore<Store>()(subscribeWithSelector(() => getInitialState()));

export const setType = (type: CONTENT_TYPE) => {
    store.setState({ type });
};

export const setPlaybackStatus = (playbackStatus: PLAYBACK_STATUS) => {
    store.setState({ playbackStatus });
};

export const togglePlayback = () => {
    const currentStatus = store.getState().playbackStatus;
    const newStatus = currentStatus === PLAYBACK_STATUS.PLAYING
        ? PLAYBACK_STATUS.PAUSED
        : PLAYBACK_STATUS.PLAYING;
    store.setState({ playbackStatus: newStatus });
};

export const setMute = (mute: boolean) => {
    store.setState({ mute });
};

export const toggleMute = () => {
    const currentMute = store.getState().mute;
    store.setState({ mute: !currentMute });
};

export default store;