import { Context } from "./context";

export abstract class VectorDrawableNodeRetriever {
  public node: Element | null = null;

  public abstract mayRetrieveNode(ctx: Context | null): Element | null;

  public estimateCondidates(): number {
    return 1;
  }

  public retrieve(ctx: Context): Promise<Element> {
    return new Promise((resolve, reject) => {
      this.node = this.mayRetrieveNode(ctx);

      if (this.node) {
        resolve(this.node);
      } else {
        reject(new Error("not vector file"));
      }
    });
  }
}
