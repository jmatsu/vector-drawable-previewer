import { SVGPresenter as Presenter } from "../abstract_svg_presenter";

import { Context } from "../context";

export class SVGPresenter extends Presenter {
    show(context: Context, svg: Node): boolean {
        document.body.insertBefore(svg, document.body.childNodes[0]);
        return true;
    }
}
