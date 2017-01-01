import { Promise } from "es6-promise";

import { VectorDrawableConverter } from "../converter/vector_drawable_conveter";
import { Package } from "../presentation/package_template";
import { Context } from "../presentation/context";

export class ShowSVGScenario {
    constructor(private pkg: Package) {
        // do nothing
    }

    consume(): Promise<boolean[]> {
        const num = this.pkg.retriever.estimateCondidates();
        const promises = new Array<Promise<boolean>>(num);

        for(let i = 0; i < num; i++) {
            const context = new Context(i);
            promises[i] = this.pkg.retriever.retrieve(
                context
            ).then((n) => {
                return new VectorDrawableConverter().convertToSVG(n);
            }).then((n) => {
                return this.pkg.presenter.present(context, n);
            });
        }

        return Promise.all(promises);
    }
}
