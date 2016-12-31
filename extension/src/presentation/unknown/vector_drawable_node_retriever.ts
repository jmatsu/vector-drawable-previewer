import { VectorDrawableNodeRetriever as Retriever } from '../abstract_vector_drawable_node_retriever';
import { Context } from '../context';

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(ctx?: Context): Node {
        return null;
    }
}
