import { NodeLists } from "../../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../../abstract_vector_drawable_node_retriever";
import { Context } from "../../context";
import { Objects } from "../../../util/objects";
import { Githubs } from "../../../util/githubs";

export class VectorDrawableNodeRetriever extends Retriever {
    estimateCondidates(): number {
        return 1;
    }

    mayRetrieveNode(ctx?: Context): Node {
        const node = document.querySelector("div.file");

        const content = Githubs.obtainFromFilePreview(node);

        if (!Objects.isDefined(content)) {
            return null;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "application/xml");
        if (NodeLists.isVector(doc.childNodes)) {
            ctx.vecBase = node;
            return doc.childNodes[0];
        } else {
            return null;
        }
    }
}
