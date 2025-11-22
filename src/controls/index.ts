import { Attributes, h, VNode } from "preact";
import { Layout } from "./components";
import { render } from "preact/compat";

class Controls {
    private _containerNode: HTMLDivElement;

    constructor(containerNode: HTMLDivElement) {
        this._containerNode = containerNode;
    }

    public init(): void {
        this._render();
    }

    private _render() {
        const nodeRender: VNode<Attributes> = h(Layout, {});
        render(nodeRender, this._containerNode);
    }
}

export default Controls;