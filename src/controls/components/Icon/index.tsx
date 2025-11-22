import { h, FunctionComponent } from "preact";
import { SVG_ICONS } from "./model";
import "./style.scss";

export type IconType = "play" | "pause" | "volumeOn" | "volumeOff";

interface IconProps {
    type: IconType;
    size?: number;
    class?: string;
}

const Icon: FunctionComponent<IconProps> = ({ type, size = 24, class: className = "" }) => {
    const svg = SVG_ICONS[type];

    if (!svg) {
        return <div class={`icon icon--unknown ${className}`}>Unknown icon</div>;
    }

    return (
        <div class={`icon icon--${type} ${className}`} style={{ "--icon-size": `${size}px` } as any}>
            <svg
                width={size}
                height={size}
                viewBox={svg.viewBox}
                dangerouslySetInnerHTML={{ __html: svg.content }}
            />
        </div>
    );
};

export { Icon };