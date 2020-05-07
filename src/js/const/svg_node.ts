// Only supported things are listed-up.
export namespace SVGNode {
    export const enum Type {
        Root = 1,
        Path,
    }

    export namespace Root {
        export namespace Attribute {
            export const Width = "width";
            export const Height = "height";
            export const ViewBox = "viewBox";
        }
    }

    export namespace Path {
        export namespace Attribute {
            export const PathData = "d";
            export const StrokeColor = "stroke";
            export const StrokeWidth = "stroke-width";
            export const StrokeLineCap = "stroke-linecap";
            export const StrokeLineJoin = "stroke-linejoin";
            export const FillColor = "style";
            export const FillColorOption = "fill";
        }
    }

    export namespace G {
        export namespace Attribute {
            export const Transform = "transform";
        }
    }
}
