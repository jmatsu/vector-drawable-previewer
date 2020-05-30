import { createPreviewElement } from "../../../util/document";
import { SVGPresenter as Presenter } from "../../abstract_svg_presenter";
import { Context } from "../../context";

export class SVGPresenter extends Presenter {
  protected show(context: Context, svg: SVGElement): boolean {
    if (!context.vecBase) {
      return false;
    }

    context.vecBase.prepend(createPreviewElement(svg));

    return true;
  }
}
