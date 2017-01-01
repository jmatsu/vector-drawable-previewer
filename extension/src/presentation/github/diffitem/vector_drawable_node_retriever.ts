import { NodeLists } from "../../../util/node_lists";
import { VectorDrawableNodeRetriever as Retriever } from "../../abstract_vector_drawable_node_retriever";
import { Context } from "../../context";
import { Objects } from "../../../util/objects";
import { Githubs } from "../../../util/githubs";

export class VectorDrawableNodeRetriever extends Retriever {
    private filenameNodes: Element[];

    estimateCondidates(): number {
        const nodes = document.querySelectorAll("div.file-info > a");
        this.filenameNodes = new Array<Element>();

        if (Objects.isDefined(nodes)) {
            for(let i = 0, end = nodes.length; i < end; i++) {
                const node = nodes[i];
                const filename = node.textContent.trim();
                if (!filename.endsWith(".xml") || filename.indexOf("/res/") < 0) {
                    continue;
                }

                this.filenameNodes.push(node);
            }
        }

        return this.filenameNodes.length;
    }

    mayRetrieveNode(ctx?: Context): Node {
        const fileNode = this.filenameNodes[ctx.index].parentElement.parentElement.parentElement.querySelector("div.js-file-content");

        if (!Objects.isDefined(fileNode)) {
            return null;
        }

        const content = Githubs.obtainFromFileDiff(fileNode);

        if (!Objects.isDefined(content)) {
            return null;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "application/xml");
        if (NodeLists.isVector(doc.childNodes)) {
            ctx.vecBase = fileNode.parentElement;
            return doc.childNodes[0];
        } else {
            return null;
        }
    }
}
