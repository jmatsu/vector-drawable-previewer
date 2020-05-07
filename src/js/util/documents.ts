import { Id } from "../const/id";

export namespace Documents {
    export function getRootNodeList(): NodeList {
        return (document.body || document).childNodes;
    }

    export function createPreviewElement(svg: Node): Element {
        const root = document.createElement("div");
        root.setAttribute("style", "padding: 10px; display: flex; flex-direction: row; align-items: center;");

        const svgContainer = document.createElement("div");
        svgContainer.setAttribute("id", Id.svgContainer);
        svgContainer.setAttribute("style", "margin: 10px;");
        svgContainer.appendChild(svg);

        const optContainer = document.createElement("div");
        optContainer.setAttribute("style", "display: inline-block;");

        const colorText = document.createElement("input");
        colorText.type = "color"
        colorText.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            (svg as Element).setAttribute("style", `background-color: ${target.value};`);
        }

        optContainer.appendChild(colorText);

        root.appendChild(svgContainer);
        root.appendChild(optContainer);

        return root;
    }
}
