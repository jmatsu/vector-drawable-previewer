import { Documents } from "../../../util/documents";
import { SVGPresenter as Presenter } from "../../abstract_svg_presenter";
import { Context } from "../../context";

export class SVGPresenter extends Presenter {
    protected show(context: Context, svg: SVGElement): boolean {
        if (!context.vecBase) {
            return false
        }

        const container = context.vecBase.querySelector("div.file-header")

        return !!(container && container.appendChild(Documents.createPreviewElement(svg)));
    }
}
