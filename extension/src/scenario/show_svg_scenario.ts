import { VectorDrawableConverter } from "../converter/vector_drawable_conveter";
import { Context } from "../presentation/context";
import { Package } from "../presentation/package_template";
import { Logger } from "../util/logger";

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
            ).then((n) => {
                return new VectorDrawableConverter().convertToSVG(n);
            }).then((n) => {
                return this.pkg.presenter.present(context, n);
            });
            promises[i].catch(err => Logger.log(err));
        }

        return Promise.all(promises);
    }
}
