import { Utility } from '../../util/utility';
import { VectorDrawableNodeRetriever as Retriever } from '../abstract_vector_drawable_node_retriever';

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(): Node {
        const nodes = document.body.childNodes;

        if (Utility.isVectorNode(nodes)) {
            return nodes[0];
        } else {
            return null;
        }
    }
}
