"use strict";
var vector_drawable_node_retriever_1 = require("./vector_drawable_node_retriever");
var svg_presenter_1 = require("./svg_presenter");
var RawPackage = (function () {
    function RawPackage() {
        this.retriever = new vector_drawable_node_retriever_1.VectorDrawableNodeRetriever();
        this.presenter = new svg_presenter_1.SVGPresenter();
    }
    return RawPackage;
}());
exports.RawPackage = RawPackage;
//# sourceMappingURL=package.js.map