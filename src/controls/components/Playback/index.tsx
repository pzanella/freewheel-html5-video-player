import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Icon } from "../Icon";
import { PLAYBACK_STATUS } from "../../../model";
import store, { togglePlayback } from "../../../store";
import "./style.scss";

interface PlaybackProps { }

const Playback: FunctionComponent<PlaybackProps> = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const unsubscribe = store.subscribe(
            (state) => state.playbackStatus,
            (playbackStatus) => {
                setIsPlaying(playbackStatus === PLAYBACK_STATUS.PLAYING);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        togglePlayback();
    };

    return h("button", 
        { class: "playback-button", onClick: handleClick }, 
        h(Icon, { type: isPlaying ? "pause" : "play", size: 24 })
    );
};

export { Playback };