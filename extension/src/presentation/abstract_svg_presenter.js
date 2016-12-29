"use strict";
var es6_promise_1 = require("es6-promise");
var SVGPresenter = (function () {
    function SVGPresenter() {
    }
    SVGPresenter.prototype.present = function (svg) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(_this.show(svg));
        });
    };
    return SVGPresenter;
}());
exports.SVGPresenter = SVGPresenter;
//# sourceMappingURL=abstract_svg_presenter.js.map