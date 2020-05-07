import { VectorDrawableConverter } from "../converter/vector_drawable_converter";
import { Context } from "../presentation/context";
import { Package } from "../presentation/package_template";

export class ShowSVGScenario {
    constructor(private pkg: Package) {
        // do nothing
    }

    public consume(): Promise<Context[]> {
        const num = this.pkg.retriever.estimateCondidates();
        const promises = new Array<Promise<Context>>(num);

        for (let i = 0; i < num; i++) {
            const context = new Context(i);

            promises[i] = this.pkg.retriever.retrieve(
                context,
            ).then((element) => {
                return new VectorDrawableConverter().convertToSVG(element);
            }).then((svg) => {
                return this.pkg.presenter.present(context, svg);
            });
        }

        return Promise.all(promises);
    }
}
