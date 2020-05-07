import { Id } from "../../const/id";
import { SVGNode } from "../../const/svg_node";
import { VectorNode } from "../../const/vector_node";
import { Colors } from "../../util/colors";

export const mapper: (data: VectorNode.Data) => SVGElement | null = (data) => {
    switch (data.type) {
        case VectorNode.Type.Root:
            return Mapping.toRoot(data.element);

        case VectorNode.Type.Path:
            return Mapping.toPath(data.element);

        case VectorNode.Type.Group:
            return Mapping.toG(data.element);

        default:
            return null;
    }
};

namespace Mapping {
    export function toRoot(vd: Element): SVGElement | null {
        const svg = createSVGElement("svg");
        svg.setAttrValue("id", Id.svg)

        const vecAttrs = VectorNode.Root.Attribute;
        const svgAttrs = SVGNode.Root.Attribute;

        const width = vd.getAttrValue(vecAttrs.Width)
        const height = vd.getAttrValue(vecAttrs.Height)

        if (!width || !height) {
            return null
        }

        svg.setAttrValue(svgAttrs.Width, width.replace("dp", "px"))
        svg.setAttrValue(svgAttrs.Height, height.replace("dp", "px"))
        svg.setAttrValue(svgAttrs.ViewBox, `0 0 ${width.replace("dp", "")} ${height.replace("dp", "")}`)

        const g = createSVGElement("g");
        g.setAttrValue("id", Id.topGroup);
        svg.appendChild(g);

        return svg;
    }

    export function toPath(vd: Element): SVGElement | null {
        const svg = createSVGElement("path");

        const vecAttrs = VectorNode.Path.Attribute;
        const svgAttrs = SVGNode.Path.Attribute;

        const fillColor = vd.getAttrValue(vecAttrs.FillColor)

        if (!fillColor) {
            return null
        }

        if (Colors.isTransparentCode(fillColor)) {
            svg.setAttrValue(svgAttrs.FillColorOption, "none")
        } else {
            svg.setAttrValue(svgAttrs.FillColor, `fill:${fillColor};`)
        }

        svg.setAttr(svgAttrs.PathData, vd.getAttr(vecAttrs.PathData))
        svg.setAttr(svgAttrs.StrokeColor, vd.getAttr(vecAttrs.StrokeColor))
        svg.setAttr(svgAttrs.StrokeWidth, vd.getAttr(vecAttrs.StrokeWidth))
        svg.setAttr(svgAttrs.StrokeLineCap, vd.getAttr(vecAttrs.StrokeLineCap))
        svg.setAttr(svgAttrs.StrokeLineJoin, vd.getAttr(vecAttrs.StrokeLineJoin))

        return svg;
    }

    export function toG(vd: Element): SVGElement {
        const svg = createSVGElement("g");

        const transformValue: string = [extractRotation(vd), extractScale(vd), extractTranslate(vd)].join(" ");

        if (transformValue.trim().length > 0) {
            vd.setAttrValue(SVGNode.G.Attribute.Transform, transformValue)
        }

        return svg;
    }

    function createSVGElement(name: string): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", name)
    }

    function extractRotation(vd: Element): string {
        const vecAttrs = VectorNode.Group.Attribute;

        const rotate = vd.getAttrValue(vecAttrs.Rotation)
        const pivotX = vd.getAttrValue(vecAttrs.PivotX)
        const pivotY = vd.getAttrValue(vecAttrs.PivotY)

        if (rotate && pivotX && pivotY) {
            return `rotate(${rotate} ${pivotX} ${pivotY})`;
        } else {
            return "";
        }
    }

    function extractScale(vd: Element): string {
        const vecAttrs = VectorNode.Group.Attribute;

        const scaleX = vd.getAttrValue(vecAttrs.ScaleX)
        const scaleY = vd.getAttrValue(vecAttrs.ScaleY)

        if (scaleX && scaleY) {
            return `scale(${scaleX} ${scaleY})`;
        } else {
            return "";
        }
    }

    function extractTranslate(vd: Element): string {
        const vecAttrs = VectorNode.Group.Attribute;

        const translateX = vd.getAttrValue(vecAttrs.TranslateX)
        const translateY = vd.getAttrValue(vecAttrs.TranslateY)

        if (translateX && translateY) {
            return `translate(${translateX} ${translateY})`;
        } else {
            return "";
        }
    }
}
