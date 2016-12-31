import { SVGPresenter as Presenter } from '../abstract_svg_presenter';

import { Context } from '../context';

export class SVGPresenter extends Presenter {
    show(context: Context, svg: Node): boolean {
        return false;
    }
}
