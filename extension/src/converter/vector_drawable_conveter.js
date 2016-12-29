"use strict";
var es6_promise_1 = require("es6-promise");
var utility_1 = require("../util/utility");
var VectorDrawableConverter = (function () {
    function VectorDrawableConverter() {
    }
    VectorDrawableConverter.prototype.convertToSVG = function (vd) {
        var _this = this;
        return new SVGWalker().walk(vd, function (type, node) {
            switch (type) {
                case 1 /* Root */:
                    var rootAttrs = vd.attributes;
                    var width = rootAttrs['android:width'].value.replace('dp', '');
                    var height = rootAttrs['android:height'].value.replace('dp', '');
                    return utility_1.Utility.createNode('svg', {
                        version: '1.1',
                        width: width + 'px',
                        height: height + 'px',
                        viewBox: '0 0 ' + width + ' ' + height
                    });
                case 2 /* Path */:
                    var nodeAttrs = node.attributes;
                    var attrs = {
                        d: nodeAttrs['android:pathData'].value,
                    };
                    _this.setValueIfExists(nodeAttrs['android:strokeColor'], attrs, 'stroke');
                    _this.setValueIfExists(nodeAttrs['android:strokeWidth'], attrs, 'stroke-width');
                    _this.setValueIfExists(nodeAttrs['android:strokeLineCap'], attrs, 'stroke-linecap');
                    _this.setValueIfExists(nodeAttrs['android:strokeLineJoin'], attrs, 'stroke-linejoin');
                    var fillColor = nodeAttrs['android:fillColor'].value;
                    if (fillColor !== '#00000000' && fillColor !== '#0000000') {
                        attrs['style'] = 'fill:' + nodeAttrs['android:fillColor'].value + ';';
                    }
                    else {
                        attrs['fill'] = 'none';
                    }
                    return utility_1.Utility.createNode('path', attrs);
                case 3 /* Rect */:
            }
            return null;
        });
    };
    VectorDrawableConverter.prototype.setValueIfExists = function (vecAttr, svgAttrMap, name) {
        if (vecAttr !== null && vecAttr !== undefined) {
            svgAttrMap[name] = vecAttr.value;
        }
    };
    return VectorDrawableConverter;
}());
exports.VectorDrawableConverter = VectorDrawableConverter;
var SVGWalker = (function () {
    function SVGWalker() {
    }
    SVGWalker.prototype.walk = function (vd, applier) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var root = applier(1 /* Root */, vd);
            if (root === null || root === undefined) {
                return reject(new Error('Failed to create root node.'));
            }
            var nodes = vd.childNodes;
            console.log(nodes);
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                switch (node.nodeName) {
                    case 'path':
                        var path = applier(2 /* Path */, node);
                        if (path !== null && path !== undefined) {
                            root.appendChild(path);
                        }
                        else {
                            return reject(new Error('Failed to handle path node.'));
                        }
                        break;
                    case 'rect':
                        var rect = applier(3 /* Rect */, node);
                        if (rect !== null && rect !== undefined) {
                            root.appendChild(rect);
                        }
                        else {
                            return reject(new Error('Failed to handle rect node.'));
                        }
                        break;
                    case '#text':
                        // skip empty string
                        continue;
                    default:
                        return reject(new Error('Found unsupported element <' + node.nodeName + '>'));
                }
            }
            return resolve(root);
        });
    };
    return SVGWalker;
}());
//# sourceMappingURL=vector_drawable_conveter.js.map