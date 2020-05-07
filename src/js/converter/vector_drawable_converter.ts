import { VectorNode } from "../const/vector_node";
import { mapper as SVGMapper } from "./svg/mapping";
import { Walker as SVGWalker } from "./svg/walker";

export class VectorDrawableConverter {
    public convertToSVG(vd: Element): Promise<SVGElement>  {
        return new SVGWalker().walk(new VectorNode.Data(VectorNode.Type.Root, vd), SVGMapper);
    }
}
