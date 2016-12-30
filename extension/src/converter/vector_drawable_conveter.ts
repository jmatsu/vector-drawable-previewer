import { Promise } from 'es6-promise';

import { Walker as SVGWalker } from './svg/walker';
import { mapper as SVGMapper } from './svg/mapping';

export class VectorDrawableConverter {
    convertToSVG(vd: Node): Promise<Node>  {
        return new SVGWalker().walk(vd, SVGMapper);
    }
}
