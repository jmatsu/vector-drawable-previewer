export namespace Utility {
    export function isVectorNode(nodes: NodeList): boolean {
        return nodes.length === 1 && Utility.isVector(nodes[0]);
    }

    export function isVector(node: Node): boolean {
        return node.nodeName === "vector";
    }

    export function createNode(name: string, attrs): Node {
        const node = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (let attrName in attrs) {
            node.setAttributeNS(null, attrName, attrs[attrName]);
        }
        return node;
    }
}
