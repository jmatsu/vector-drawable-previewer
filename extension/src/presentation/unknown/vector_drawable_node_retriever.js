"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_vector_drawable_node_retriever_1 = require("../abstract_vector_drawable_node_retriever");
var VectorDrawableNodeRetriever = (function (_super) {
    __extends(VectorDrawableNodeRetriever, _super);
    function VectorDrawableNodeRetriever() {
        return _super.apply(this, arguments) || this;
    }
    VectorDrawableNodeRetriever.prototype.mayRetrieveNode = function () {
        return null;
    };
    return VectorDrawableNodeRetriever;
}(abstract_vector_drawable_node_retriever_1.VectorDrawableNodeRetriever));
exports.VectorDrawableNodeRetriever = VectorDrawableNodeRetriever;
//# sourceMappingURL=vector_drawable_node_retriever.js.map