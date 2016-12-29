import { SVGPresenter as Presenter } from '../abstract_svg_presenter';

export class SVGPresenter extends Presenter {
    show(svg: Node): boolean {
        document.body.insertBefore(svg, document.body.childNodes[0]);
        return true;
    }
}
