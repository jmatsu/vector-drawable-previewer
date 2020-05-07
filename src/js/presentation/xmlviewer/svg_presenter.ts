import { SVGPresenter as Presenter } from "../abstract_svg_presenter";
import { Context } from "../context";

export class SVGPresenter extends Presenter {
    protected show(_: Context, svg: SVGElement): boolean {
        document.body.insertBefore(svg, document.body.childNodes[0]);
        return true;
    }
}
