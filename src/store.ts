import { createStore } from "zustand/vanilla";
import { CONTENT_TYPE, PLAYBACK_STATUS, Store } from "./model";
import { subscribeWithSelector } from "zustand/middleware";

const store = createStore<Store>()(subscribeWithSelector((): Store => ({
    type: CONTENT_TYPE.VOD,
    playbackStatus: PLAYBACK_STATUS.PAUSED,
})));

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

export default store;