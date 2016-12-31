import { NodeLists } from '../../util/node_lists';
import { VectorDrawableNodeRetriever as Retriever } from '../abstract_vector_drawable_node_retriever';
import { Context } from '../context';

export class VectorDrawableNodeRetriever extends Retriever {
    mayRetrieveNode(ctx?: Context): Node {
        const nodes = document.body.childNodes;

        if (NodeLists.isVector(nodes)) {
            ctx.vecBase = document.body;
            return nodes[0];
        } else {
            return null;
        }
    }
}
