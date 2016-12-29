"use strict";
var vector_drawable_conveter_1 = require("../../converter/vector_drawable_conveter");
var ShowSVGScenario = (function () {
    function ShowSVGScenario(pkg) {
        this.pkg = pkg;
        // do nothing
    }
    ShowSVGScenario.prototype.consume = function () {
        var _this = this;
        return this.pkg.retriever.retrieve().then(function (n) {
            return new vector_drawable_conveter_1.VectorDrawableConverter().convertToSVG(n);
        }).then(function (n) {
            return _this.pkg.presenter.show(n);
        });
    };
    return ShowSVGScenario;
}());
exports.ShowSVGScenario = ShowSVGScenario;
//# sourceMappingURL=show_svg_scenario.js.map