import { Documents } from "../../../util/documents";
import { SVGPresenter as Presenter } from "../../abstract_svg_presenter";
import { Context } from "../../context";

export class SVGPresenter extends Presenter {
    protected show(context: Context, svg: Node): boolean {
        context.vecBase.querySelector("div.file-header").appendChild(Documents.createPreviewElement(svg));
        return true;
    }
}
