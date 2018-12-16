import { NodeLists } from "../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(ctx?: Context): Element {
        const parser = new DOMParser();
        const doc = parser.parseFromString(document.body.childNodes[0].textContent, "application/xml");
        const vectorNode = NodeLists.findVectorNode(doc.childNodes);
        if (vectorNode) {
            ctx.vecBase = document.body;
            return vectorNode;
        } else {
            return null;
        }
    }
}
