import { Promise } from 'es6-promise';

import { VectorDrawableConverter } from '../../converter/vector_drawable_conveter';
import { Package } from '../../presentation/package_template';

export class ShowSVGScenario {
    constructor(private pkg: Package) {
        // do nothing
    }

    consume(): Promise<boolean> {
        return this.pkg.retriever.retrieve(
            /* none */
        ).then((n) => {
            return new VectorDrawableConverter().convertToSVG(n);
        }).then((n) => {
            return this.pkg.presenter.show(n);
        });
    }
}
