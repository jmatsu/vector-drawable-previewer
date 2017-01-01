import { Promise } from "es6-promise";

import { Context } from "./context";

export abstract class SVGPresenter {
    protected abstract show(context: Context, svg: Node): boolean;

    public present(context: Context, svg: Node): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.show(context, svg));
        });
    }
}
