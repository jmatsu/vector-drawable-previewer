import { NodeLists } from '../../util/node_lists';
import { VectorDrawableNodeRetriever as Retriever } from '../abstract_vector_drawable_node_retriever';

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(): Node {
        const parser = new DOMParser();
        const doc = parser.parseFromString(document.body.childNodes[0].textContent, "application/xml");
        if (NodeLists.isVector(doc.childNodes)) {
            return doc.childNodes[0];
        } else {
            return null;
        }
    }
}
