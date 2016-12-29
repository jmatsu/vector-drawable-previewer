"use strict";
var es6_promise_1 = require("es6-promise");
var VectorDrawableNodeRetriever = (function () {
    function VectorDrawableNodeRetriever() {
    }
    VectorDrawableNodeRetriever.prototype.retrieve = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var node = _this.mayRetrieveNode();
            if (node !== null && node !== undefined) {
                resolve(node);
            }
            else {
                reject(new Error("Not vector file."));
            }
        });
    };
    return VectorDrawableNodeRetriever;
}());
exports.VectorDrawableNodeRetriever = VectorDrawableNodeRetriever;
//# sourceMappingURL=abstract_vector_drawable_node_retriever.js.map