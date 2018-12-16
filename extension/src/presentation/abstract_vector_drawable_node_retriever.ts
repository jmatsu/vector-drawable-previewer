import { Context } from "./context";

export abstract class VectorDrawableNodeRetriever {
    public node?: Element;

    public abstract mayRetrieveNode(ctx?: Context): Element;

    public estimateCondidates(): number {
        return 1;
    }

    public retrieve(ctx: Context = null): Promise<Element> {
        return new Promise((resolve, reject) => {
            this.node = this.mayRetrieveNode(ctx);

            if (this.node !== null && this.node !== undefined) {
                resolve(this.node);
            } else {
                reject(new Error("Not vector file."));
            }
        });
    }
}
