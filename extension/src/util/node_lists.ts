import { Nodes } from "./nodes";

export namespace NodeLists {
    export function isVector(nodes: NodeList): boolean {
        return nodes.length === 1 && Nodes.isVector(nodes[0]);
    }
}
