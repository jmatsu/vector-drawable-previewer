import { SVGPresenter as AbstractSVGPresenter } from "./abstract_svg_presenter";
import { VectorDrawableNodeRetriever as AbstractVectorDrawableNodeRetriever } from "./abstract_vector_drawable_node_retriever";

export interface Package {
    retriever: AbstractVectorDrawableNodeRetriever;
    presenter: AbstractSVGPresenter;
}
