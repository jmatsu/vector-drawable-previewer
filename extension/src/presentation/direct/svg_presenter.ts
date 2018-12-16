import { Documents } from "../../util/documents";
import { SVGPresenter as Presenter } from "../abstract_svg_presenter";
import { Context } from "../context";

export class SVGPresenter extends Presenter {
    protected show(_: Context, svg: SVGElement): boolean {
        (document.body || document).insertBefore(Documents.createPreviewElement(svg), Documents.getRootNodeList()[0]);
        return true;
    }
}
