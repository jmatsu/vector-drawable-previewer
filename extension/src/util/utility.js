"use strict";
var Utility;
(function (Utility) {
    function isVectorNode(nodes) {
        return nodes.length === 1 && Utility.isVector(nodes[0]);
    }
    Utility.isVectorNode = isVectorNode;
    function isVector(node) {
        return node.nodeName === "vector";
    }
    Utility.isVector = isVector;
    function createNode(name, attrs) {
        var node = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (var attrName in attrs) {
            node.setAttributeNS(null, attrName, attrs[attrName]);
        }
        return node;
    }
    Utility.createNode = createNode;
})(Utility = exports.Utility || (exports.Utility = {}));
//# sourceMappingURL=utility.js.map