import { VectorDrawableNodeRetriever } from "./vector_drawable_node_retriever";
import { SVGPresenter } from "./svg_presenter";
import { Package as PackageTemplate } from "../package_template";

export class DirectPackage implements PackageTemplate {
    retriever = new VectorDrawableNodeRetriever();
    presenter = new SVGPresenter();
}
