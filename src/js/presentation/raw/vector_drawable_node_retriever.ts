import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
  public mayRetrieveNode(ctx: Context): Element | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      document.body.childNodes[0].textContent || "",
      "application/xml"
    );
    const vdElement = doc.childNodes.findVectorDrawbleElement();

    if (vdElement) {
      ctx.vecBase = document.body;
      return vdElement;
    } else {
      return null;
    }
  }
}
