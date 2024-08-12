import { Context } from "../presentation/context";
import { Package } from "../presentation/package_template";
import { transform, parseAndroidResource } from "vector-drawable-svg";

export interface AndroidVectorDrawableSVG {
  element: SVGElement;
  resources: { [key: string]: string };
}

export class ShowSVGScenario {
  constructor(private pkg: Package) {
    // do nothing
  }

  public consume(): Promise<Context[]> {
    const num = this.pkg.retriever.estimateCondidates();
    const promises = new Array<Promise<Context>>(num);

    for (let i = 0; i < num; i++) {
      const context = new Context(i);

      promises[i] = this.pkg.retriever
        .retrieve(context)
        .then((element) => {
          return new Promise<AndroidVectorDrawableSVG>((resolve) => {
            const resources = parseAndroidResource(element.outerHTML) || {};

            const svgHtmlText = transform(element.outerHTML, {
              override: resources,
            });
            const template = document.createElement("template");
            template.innerHTML = svgHtmlText;
            resolve({
              element: template.firstElementChild as unknown as SVGElement,
              resources: resources,
            });
          });
        })
        .then((svg) => {
          return this.pkg.presenter.present(context, svg);
        });
    }

    return Promise.all(promises);
  }
}
