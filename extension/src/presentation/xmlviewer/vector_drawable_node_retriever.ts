import { NodeLists } from "../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(ctx?: Context): Element {
        const nodes = document.body.childNodes[0].childNodes;
        const vectorNode = NodeLists.findVectorNode(nodes);
        if (vectorNode) {
            ctx.vecBase = vectorNode.parentElement;
            return vectorNode;
        } else {
            return null;
        }
    }
}
