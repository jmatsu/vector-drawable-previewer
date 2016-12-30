import { NodeLists } from '../../util/node_lists';
import { VectorDrawableNodeRetriever as Retriever } from '../abstract_vector_drawable_node_retriever';

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(): Node {
        const nodes = document.body.childNodes[0].childNodes;
        if (NodeLists.isVector(nodes)) {
            return nodes[0];
        } else {
            return null;
        }
    }
}
