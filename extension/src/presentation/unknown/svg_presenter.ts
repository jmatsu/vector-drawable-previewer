import { SVGPresenter as Presenter } from "../abstract_svg_presenter";

import { Context } from "../context";

export class SVGPresenter extends Presenter {
    protected show(_: Context, __: SVGElement): boolean {
        return false;
    }
}
