import { Nodes } from "./nodes";

export namespace NodeLists {
    export function findVectorNode(nodes: NodeList): Node | undefined {
        const vectorNodes: Array<Node> = [];
        nodes.forEach(node => {
            if (Nodes.isVector(node)) {
                vectorNodes.push(node);
            } else if (!Nodes.isComment(node)) {
                return undefined;
            }
        });
        return vectorNodes.length === 1 ? vectorNodes[0] : undefined;
    }
}
