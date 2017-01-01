import { Promise } from "es6-promise";

import { Context } from "./context";

export abstract class SVGPresenter {
    abstract show(context: Context, svg: Node): boolean;

    present(context: Context, svg: Node): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.show(context, svg));
        });
    }
}
