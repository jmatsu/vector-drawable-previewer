import { Promise } from 'es6-promise';

export abstract class SVGPresenter {
    abstract show(svg: Node): boolean;

    present(svg: Node): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.show(svg));
        });
    }
}
