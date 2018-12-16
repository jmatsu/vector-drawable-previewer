import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(ctx: Context): Element | null {
        const vdElement = document.body.childNodes.findVectorDrawbleElement();

        if (vdElement) {
            ctx.vecBase = document.body;
            return vdElement;
        } else {
            return null;
        }
    }
}
