export namespace VectorNode {
    export const enum Type {
        Root = 1,
        Path,
    }

    export namespace Root {
        export namespace Attribute {
            export const Width = "android:width";
            export const Height = "android:height";
        }
    }

    export namespace Path {
        export namespace Attribute {
            export const PathData = "android:pathData";
            export const StrokeColor = "android:strokeColor";
            export const StrokeWidth = "android:strokeWidth";
            export const StrokeLineCap = "android:strokeLineCap";
            export const StrokeLineJoin = "android:strokeLineJoin";
            export const FillColor = "android:fillColor";
        }
    }
}
