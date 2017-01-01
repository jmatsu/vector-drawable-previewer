import { NodeLists } from "../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(ctx?: Context): Node {
        const parser = new DOMParser();
        const doc = parser.parseFromString(document.body.childNodes[0].textContent, "application/xml");
        if (NodeLists.isVector(doc.childNodes)) {
            ctx.vecBase = document.body;
            return doc.childNodes[0];
        } else {
            return null;
        }
    }
}
