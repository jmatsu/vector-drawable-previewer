import { mapper as SVGMapper } from "./svg/mapping";
import { Walker as SVGWalker } from "./svg/walker";

export class VectorDrawableConverter {
    public convertToSVG(vd: Node): Promise<Node>  {
        return new SVGWalker().walk(vd, SVGMapper);
    }
}
