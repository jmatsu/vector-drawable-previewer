"use strict";
var package_1 = require("./direct/package");
var package_2 = require("./raw/package");
var package_3 = require("./unknown/package");
var package_4 = require("./xmlviewer/package");
var PresentationComponent;
(function (PresentationComponent) {
    function getPackage() {
        if (Helper.isDirectMode()) {
            return new package_1.DirectPackage();
        }
        else if (Helper.isRawMode()) {
            return new package_2.RawPackage();
        }
        else if (Helper.isXmlViewerMode()) {
            return new package_4.XmlViewerPackage();
        }
        else {
            return new package_3.UnknownPackage();
        }
    }
    PresentationComponent.getPackage = getPackage;
})(PresentationComponent = exports.PresentationComponent || (exports.PresentationComponent = {}));
var Helper;
(function (Helper) {
    function getRootNodes() {
        return (document.body || document).childNodes;
    }
    function isDirectMode() {
        var nodes = getRootNodes();
        return nodes.length === 1 && nodes[0].nodeName === 'vector';
    }
    Helper.isDirectMode = isDirectMode;
    function isRawMode() {
        var nodes = getRootNodes();
        return nodes.length === 1 && nodes[0].nodeName === 'PRE';
    }
    Helper.isRawMode = isRawMode;
    function isXmlViewerMode() {
        var nodes = getRootNodes();
        if (nodes.length === 0) {
            return false;
        }
        var node = nodes[0];
        return node.nodeName === 'div' && node.attributes['id'].value === 'webkit-xml-viewer-source-xml';
    }
    Helper.isXmlViewerMode = isXmlViewerMode;
})(Helper || (Helper = {}));
//# sourceMappingURL=presentation_component.js.map