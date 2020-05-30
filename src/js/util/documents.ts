import { Id } from "../const/id";

export namespace Documents {
    export function getRootNodeList(): NodeList {
        return (document.body || document).childNodes;
    }

    export function createPreviewElement(svg: SVGElement): Element {
        const root = document.createElement("div");
        root.style.padding = "10px";
        root.style.display = "flex";
        root.style.flexDirection = "row";
        root.style.alignItems = "center";

        const svgContainer = document.createElement("div");
        svgContainer.id = Id.svgContainer
        svgContainer.style.margin = "10px";
        svgContainer.appendChild(svg);

        const optContainer = document.createElement("div");
        optContainer.style.display = "inline-block";

        const bgColorInput = document.createElement("input");
        bgColorInput.id = Id.svgColorElement
        bgColorInput.type = "color"
        bgColorInput.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            (svg as SVGElement).style.backgroundColor = target.value;
        }

        optContainer.appendChild(bgColorInput);

        root.appendChild(svgContainer);
        root.appendChild(optContainer);

        return root;
    }
}
