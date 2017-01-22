import { SVGNode } from "../../const/svg_node";
import { VectorNode } from "../../const/vector_node";
import { Colors } from "../../util/colors";
import { Nodes } from "../../util/nodes";
import { Objects } from "../../util/objects";

export const mapper = (type: VectorNode.Type, node: Node) => {
    switch (type) {
        case VectorNode.Type.Root:
            return Mapping.toRoot(node);

        case VectorNode.Type.Path:
            return Mapping.toPath(node);

        case VectorNode.Type.Group:
            return Mapping.toG(node);

        default:
            return null;
    }
};

namespace Mapping {
    export function toRoot(copyFrom: Node): Node {
        const svg = Nodes.createNode("svg");

        const copyFromAttr = copyFrom.attributes;
        const vecAttrs = VectorNode.Root.Attribute;
        const svgAttrs = SVGNode.Root.Attribute;

        const width = copyFromAttr[vecAttrs.Width].value.replace("dp", "");
        const height = copyFromAttr[vecAttrs.Height].value.replace("dp", "");

        Nodes.setAttribute(`${width}px`, svg, svgAttrs.Width);
        Nodes.setAttribute(`${height}px`, svg, svgAttrs.Height);
        Nodes.setAttribute(`0 0 ${width} ${height}`, svg, svgAttrs.ViewBox);
        return svg;
    }

    export function toPath(copyFrom: Node) {
        const path = Nodes.createNode("path");

        const copyFromAttr = copyFrom.attributes;
        const vecAttrs = VectorNode.Path.Attribute;
        const svgAttrs = SVGNode.Path.Attribute;

        Nodes.copyAttribute(copyFrom, vecAttrs.PathData, path, svgAttrs.PathData);
        Nodes.copyAttribute(copyFrom, vecAttrs.StrokeColor, path, svgAttrs.StrokeColor);
        Nodes.copyAttribute(copyFrom, vecAttrs.StrokeWidth, path, svgAttrs.StrokeWidth);
        Nodes.copyAttribute(copyFrom, vecAttrs.StrokeLineCap, path, svgAttrs.StrokeLineCap);
        Nodes.copyAttribute(copyFrom, vecAttrs.StrokeLineJoin, path, svgAttrs.StrokeLineJoin);

        const fillColor = copyFromAttr[vecAttrs.FillColor].value;

        if (Colors.isTransparentCode(fillColor)) {
            Nodes.setAttribute("none", path, svgAttrs.FillColorOption);
        } else {
            Nodes.setAttribute(`fill:${fillColor};`, path, svgAttrs.FillColor);
        }

        return path;
    }

    export function toG(copyFrom: Node) {
        const g = Nodes.createNode("g");

        const copyFromAttr = copyFrom.attributes;
        const vecAttrs = VectorNode.Group.Attribute;
        const svgAttrs = SVGNode.G.Attribute;

        if (canRotate(copyFrom)) {
            const rotate = copyFromAttr[vecAttrs.Rotation].value;
            const pivotX = copyFromAttr[vecAttrs.PivotX].value;
            const pivotY = copyFromAttr[vecAttrs.PivotY].value;

            Nodes.setAttribute(`rotate(${rotate} ${pivotX} ${pivotY})`, g, svgAttrs.Transform);
        }

        return g;
    }

    function canRotate(node: Node) {
        const attrs = node.attributes;
        const vecAttrs = VectorNode.Group.Attribute;

        const rotate = attrs[vecAttrs.Rotation];
        const pivotX = attrs[vecAttrs.PivotX];
        const pivotY = attrs[vecAttrs.PivotY];

        return Objects.isDefined(rotate) && Objects.isDefined(rotate) && Objects.isDefined(rotate);
    }
}
