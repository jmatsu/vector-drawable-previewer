import "../../../util/extension"

import { Githubs } from "../../../util/githubs";
import { VectorDrawableNodeRetriever as Retriever } from "../../abstract_vector_drawable_node_retriever";
import { Context } from "../../context";

export class VectorDrawableNodeRetriever extends Retriever {
    private filenameNodes: Element[] = [];

    public estimateCondidates(): number {
        const nodes = document.querySelectorAll("div.file-info > a");
        this.filenameNodes = new Array<Element>();

        if (nodes) {
            for (const node of nodes) {
                const filename = node.textContent && node.textContent.trim();

                if (!filename || !filename.endsWith(".xml") || filename.indexOf("/res/") < 0) {
                    continue;
                }

                this.filenameNodes.push(node);
            }
        }

        return this.filenameNodes.length;
    }

    public mayRetrieveNode(ctx: Context): Element | null {
        const filenameNode = this.filenameNodes[ctx.index]
        const diffItem = filenameNode && filenameNode.parentElementOf(3)
        const fileNode = diffItem && diffItem.querySelector("div.js-file-content");

        if (!fileNode) {
            return null;
        }

        const content = Githubs.obtainFromFileDiff(fileNode);

        if (!content) {
            return null;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "application/xml");
        const vdElement = doc.childNodes.findVectorDrawbleElement();

        if (vdElement) {
            ctx.vecBase = fileNode.parentElement!
            return vdElement;
        } else {
            return null;
        }
    }
}
