import { h, FunctionComponent } from "preact";
import "./style.scss";
import { Playback } from "./Playback";
import { Muted } from "./Volume";

interface LayoutProps { }

const Layout: FunctionComponent<LayoutProps> = () => {
    return <div class="layout">
        <div id="ad-container" style="position: absolute; top: 0; width: inherit; height: inherit;">
            <video style="width: inherit; height: inherit;"></video>
        </div>
        <video id="content" style="width: inherit; height: inherit;"></video>
        <div className="controls">
            <Playback />
            <Muted />
        </div>
    </div>;
};

export { Layout };