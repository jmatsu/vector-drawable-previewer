import { obtainFromFilePreview } from "../../../util/github";
import { VectorDrawableNodeRetriever as Retriever } from "../../abstract_vector_drawable_node_retriever";
import { Context } from "../../context";

export class VectorDrawableNodeRetriever extends Retriever {
  public mayRetrieveNode(ctx: Context): Element | null {
    const node = document.querySelector("div.blob-wrapper");

    if (!node) {
      return null;
    }

    const content = obtainFromFilePreview(node);

    if (!content) {
      return null;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "application/xml");
    const vdElement = doc.childNodes.findVectorDrawbleElement();

    if (vdElement) {
      ctx.vecBase = node;
      return vdElement;
    } else {
      return null;
    }
  }
}
