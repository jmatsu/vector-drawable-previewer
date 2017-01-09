import { Githubs } from "../../../util/githubs";
import { NodeLists } from "../../../util/node_lists";
import { Objects } from "../../../util/objects";
import { VectorDrawableNodeRetriever as Retriever } from "../../abstract_vector_drawable_node_retriever";
import { Context } from "../../context";

export class VectorDrawableNodeRetriever extends Retriever {
    public mayRetrieveNode(ctx?: Context): Node {
        const node = document.querySelector("div.file");

        if (!Objects.isDefined(node)) {
            return null;
        }

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
