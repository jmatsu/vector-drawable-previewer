export namespace Documents {
    export function getRootNodeList(): NodeList {
        return (document.body || document).childNodes;
    }

    export function createPreviewElement(svg: Node): Element {
        const width = +(svg as SVGElement).getAttributeNS(null, "width").replace("px", "");
        const height = +(svg as SVGElement).getAttributeNS(null, "height").replace("px", "");

        const root = document.createElement("div");
        root.setAttribute("style", "padding: 10px;");

        const svgContainer = document.createElement("span");
        svgContainer.appendChild(svg);

        const optContainer = document.createElement("div");
        optContainer.setAttribute("style", "margin: auto;");

        const radioDivs = new Array<Element>(4);
        radioDivs[0] = createColorRadioBox("vdv-default", "None");
        radioDivs[1] = createColorRadioBox("vdv-white", "#FFFFFF");
        radioDivs[2] = createColorRadioBox("vdv-gray", "#747474");
        radioDivs[3] = createColorRadioBox("vdv-black", "#000000");

        for (const radioDiv of radioDivs) {
            const radio = radioDiv.querySelector("input[type=radio]") as HTMLInputElement;
            radio.onclick = (e: MouseEvent) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    if (target.value === "None") {
                        svgContainer.style.backgroundColor = null;
                    } else {
                        svgContainer.style.backgroundColor = target.value;
                    }
                }
            };
            optContainer.appendChild(radioDiv);
        }

        const description = document.createElement("div");
        description.appendChild(document.createTextNode("Select backgournd color"));

        root.appendChild(svgContainer);
        root.appendChild(description);
        root.appendChild(optContainer);
        return root;
    }

    function createColorRadioBox(id: string, colorCode: string): Element {
        const e = document.createElement("input") as HTMLInputElement;
        e.setAttribute("type", "radio");
        e.setAttribute("name", "vdv-color-code");
        e.setAttribute("id", id);
        e.setAttribute("value", colorCode);
        e.checked = "vdv-default" === id;
        const le = document.createElement("label");
        le.htmlFor = id;
        le.appendChild(document.createTextNode(` ${colorCode}`));
        const root = document.createElement("div");
        root.appendChild(e);
        root.appendChild(le);
        return root;
    }
}
