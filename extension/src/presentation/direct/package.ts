import { Package as PackageTemplate } from "../package_template";
import { SVGPresenter } from "./svg_presenter";
import { VectorDrawableNodeRetriever } from "./vector_drawable_node_retriever";

export class DirectPackage implements PackageTemplate {
    public retriever = new VectorDrawableNodeRetriever();
    public presenter = new SVGPresenter();
}
