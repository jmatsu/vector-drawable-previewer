import { Context } from "./context";

export abstract class SVGPresenter {
  protected abstract show(context: Context, svg: SVGElement): boolean;

  public present(
    context: Context,
    svg: SVGElement,
    resources: unknown,
  ): Promise<Context> {
    return new Promise((resolve, reject) => {
      if (this.show(context, svg)) {
        resolve(context);
      } else {
        reject(new Error("cannot show the given svg."));
      }
    });
  }
}
