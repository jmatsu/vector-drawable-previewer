import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(_: Context): Element | null {
        return null;
    }
}
