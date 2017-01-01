import { SVGPresenter as Presenter } from "../abstract_svg_presenter";
import { Documents } from "../../util/documents";
import { Context } from "../context";

export class SVGPresenter extends Presenter {
    show(context: Context, svg: Node): boolean {
        (document.body || document).insertBefore(svg, Documents.getRootNodeList()[0]);
        return true;
    }
}
