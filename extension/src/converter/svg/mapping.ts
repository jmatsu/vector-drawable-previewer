import { Id } from "../../const/id";
import { SVGNode } from "../../const/svg_node";
import { VectorNode } from "../../const/vector_node";
import { Colors } from "../../util/colors";
import { Documents } from "../../util/documents";
import { Nodes } from "../../util/nodes";
import { Objects } from "../../util/objects";

export const mapper = (type: VectorNode.Type, node: Element) => {
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
    export function toRoot(copyFrom: Element): Element {
        const svg = Nodes.createNode("svg");
        svg.setAttribute("id", Id.svg);

        const copyFromAttr = copyFrom.attributes;
        const vecAttrs = VectorNode.Root.Attribute;
        const svgAttrs = SVGNode.Root.Attribute;

        const width = copyFromAttr[vecAttrs.Width].value.replace("dp", "");
        const height = copyFromAttr[vecAttrs.Height].value.replace("dp", "");

        Nodes.setAttribute(`${width}px`, svg, svgAttrs.Width);
        Nodes.setAttribute(`${height}px`, svg, svgAttrs.Height);
        Nodes.setAttribute(`0 0 ${width} ${height}`, svg, svgAttrs.ViewBox);

        const g = Nodes.createNode("g");
        g.setAttribute("id", Id.topGroup);
        svg.appendChild(g);

        return svg;
    }

    export function toPath(copyFrom: Element): Element {
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

    export function toG(copyFrom: Element): Element {
        const g = Nodes.createNode("g");

        const svgAttrs = SVGNode.G.Attribute;
        const transformValue: string = [extractRotation(copyFrom), extractScale(copyFrom), extractTranslate(copyFrom)].join(" ");

        if (transformValue.trim().length > 0) {
            Nodes.setAttribute(transformValue, g, svgAttrs.Transform);
        }

        return g;
    }

    function extractRotation(node: Element): string {
        const attrs = node.attributes;
        const vecAttrs = VectorNode.Group.Attribute;

        const rotate = attrs[vecAttrs.Rotation];
        const pivotX = attrs[vecAttrs.PivotX];
        const pivotY = attrs[vecAttrs.PivotY];

        if (Objects.isDefined(rotate) && Objects.isDefined(pivotX) && Objects.isDefined(pivotY)) {
            return `rotate(${rotate.value} ${pivotX.value} ${pivotY.value})`;
        } else {
            return "";
        }
    }

    function extractScale(node: Element): string {
        const attrs = node.attributes;
        const vecAttrs = VectorNode.Group.Attribute;

        const scaleX = attrs[vecAttrs.ScaleX];
        const scaleY = attrs[vecAttrs.ScaleY];

        if (Objects.isDefined(scaleX) && Objects.isDefined(scaleY)) {
            return `scale(${scaleX.value} ${scaleY.value})`;
        } else {
            return "";
        }
    }

    function extractTranslate(node: Element): string {
        const attrs = node.attributes;
        const vecAttrs = VectorNode.Group.Attribute;

        const translateX = attrs[vecAttrs.TranslateX];
        const translateY = attrs[vecAttrs.TranslateY];

        if (Objects.isDefined(translateX) && Objects.isDefined(translateY)) {
            return `translate(${translateX.value} ${translateY.value})`;
        } else {
            return "";
        }
    }
}
