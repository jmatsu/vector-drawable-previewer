import { NodeLists } from "../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(ctx?: Context): Element {
        const nodes = document.body.childNodes;
        const vectorNode = NodeLists.findVectorNode(nodes);

        if (vectorNode) {
            ctx.vecBase = document.body;
            return vectorNode;
        } else {
            return null;
        }
    }
}
