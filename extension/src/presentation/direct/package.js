"use strict";
var vector_drawable_node_retriever_1 = require("./vector_drawable_node_retriever");
var svg_presenter_1 = require("./svg_presenter");
var DirectPackage = (function () {
    function DirectPackage() {
        this.retriever = new vector_drawable_node_retriever_1.VectorDrawableNodeRetriever();
        this.presenter = new svg_presenter_1.SVGPresenter();
    }
    return DirectPackage;
}());
exports.DirectPackage = DirectPackage;
//# sourceMappingURL=package.js.map