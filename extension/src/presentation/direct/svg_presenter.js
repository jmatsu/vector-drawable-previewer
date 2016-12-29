"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_svg_presenter_1 = require("../abstract_svg_presenter");
var SVGPresenter = (function (_super) {
    __extends(SVGPresenter, _super);
    function SVGPresenter() {
        return _super.apply(this, arguments) || this;
    }
    SVGPresenter.prototype.show = function (svg) {
        if (document.body !== null && document.body !== undefined) {
            document.body.insertBefore(svg, document.body.childNodes[0]);
        }
        else {
            document.insertBefore(svg, document.childNodes[0]);
        }
        return true;
    };
    return SVGPresenter;
}(abstract_svg_presenter_1.SVGPresenter));
exports.SVGPresenter = SVGPresenter;
//# sourceMappingURL=svg_presenter.js.map