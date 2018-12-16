import { Nodes } from "./nodes";

export namespace NodeLists {
    export function findVectorNode(nodes: NodeList): Element {
        const vectorNodes: Array<Element> = [];
        nodes.forEach(node => {
            if (Nodes.isVector(node)) {
                vectorNodes.push(node as Element);
            } else if (!Nodes.isComment(node)) {
                return undefined;
            }
        });
        return vectorNodes.length === 1 ? vectorNodes[0] : undefined;
    }
}
