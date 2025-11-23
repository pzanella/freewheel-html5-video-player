import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Icon } from "../Icon";
import store, { toggleMute } from "../../../store";
import "./style.scss";

interface MutedProps { }

const Muted: FunctionComponent<MutedProps> = () => {
    const [isMuted, setIsMuted] = useState(store.getState().mute);

    useEffect(() => {
        const unsubscribe = store.subscribe(
            (state) => state.mute,
            (mute) => {
                setIsMuted(mute);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        toggleMute();
    };

    return h("button",
        { class: "muted-button", onClick: handleClick },
        h(Icon, { type: isMuted ? "mutedOff" : "mutedOn", size: 24 })
    );
};

export { Muted };
