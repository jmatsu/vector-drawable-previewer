import { Objects } from "./objects";

export namespace Nodes {
    export function isComment(node: Node): boolean {
        return node.nodeName === "comment";
    }

    export function isVector(node: Node): boolean {
        return node instanceof Element && node.nodeName === "vector";
    }

    export function createNode(name: string): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", name);
    }

    export function setAttribute(value: string, copyTo: Element, copyToName: string) {
        if (Objects.isDefined(value)) {
            if (typeof (copyTo as any).setAttributeNS === "function") {
                (copyTo as any).setAttributeNS(null, copyToName, value);
            } else {
                copyTo.attributes[copyToName] = value;
            }
        }
    }

    export function copyAttribute(copyFrom: Element, copyFromName: string,
        copyTo: Element, copyToName: string, converter: (val: string) => string = (val) => val) {
        const attr = copyFrom.attributes[copyFromName];
        if (Objects.isDefined(attr)) {
            if (typeof (copyTo as any).setAttributeNS === "function") {
                (copyTo as any).setAttributeNS(null, copyToName, converter(attr.value));
            } else {
                copyTo.attributes[copyToName] = converter(attr.value);
            }
        }
    }

    export function hasClass(target: Element, className: string) {
        return new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);
    }
}
