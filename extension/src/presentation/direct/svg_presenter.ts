import { SVGPresenter as Presenter } from '../abstract_svg_presenter';

export class SVGPresenter extends Presenter {
    show(svg: Node): boolean {
        if (document.body !== null && document.body !== undefined) {
            document.body.insertBefore(svg, document.body.childNodes[0]);
        } else {
            document.insertBefore(svg, document.childNodes[0]);
        }
        return true;
    }
}
