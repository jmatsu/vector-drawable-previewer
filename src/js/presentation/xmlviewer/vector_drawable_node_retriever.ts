import { VectorDrawableNodeRetriever as Retriever } from "../abstract_vector_drawable_node_retriever";
import { Context } from "../context";

export class VectorDrawableNodeRetriever extends Retriever {
  public mayRetrieveNode(ctx: Context): Element | null {
    const nodes = document.body.childNodes[0].childNodes;
    const vdElement = nodes.findVectorDrawbleElement();

    if (vdElement) {
      ctx.vecBase = vdElement.parentElement!;
      return vdElement;
    } else {
      return null;
    }
  }
}
