/* disable-eslint: no-inner-declarations */

export namespace VectorNode {
  export const enum Type {
    Root = 1,
    Path,
    Group,
  }

  export class Data {
    constructor(
      public type: Type,
      public element: Element,
    ) {}

    public hasChildren(): boolean {
      return this.type === Type.Group;
    }
  }

  export namespace Root {
    export namespace Attribute {
      export const Width = "android:width";
      export const Height = "android:height";
      // export const ViewportWidth = "android:viewportWidth";
      // export const ViewportHeight = "android:viewportHeight";
      // export const Tint = "android:tint";
      // export const TintMode = "android:tintMode";
      // export const AutoMirrored = "android:autoMirrored";
      // export const Alpha = "android:alpha";
    }
  }

  export namespace Path {
    export namespace Attribute {
      // export const Name = "android:name";
      export const PathData = "android:pathData";
      // export const StrokeAlpha = "android:strokeAlpha";
      export const StrokeColor = "android:strokeColor";
      export const StrokeWidth = "android:strokeWidth";
      export const StrokeLineCap = "android:strokeLineCap";
      export const StrokeLineJoin = "android:strokeLineJoin";
      // export const StrokeMiterLimit = "android:strokeMiterLimit";
      // export const TrimPathStart = "android:trimPathStart";
      // export const TrimPathEnd = "android:trimPathEnd";
      // export const TrimPathOffset = "android:trimPathOffset";
      // export const FillAlpha = "android:fillAlpha";
      export const FillColor = "android:fillColor";
      // export const FillType = "android:fillType";
    }
  }

  export namespace Group {
    export namespace Attribute {
      //         export const Name = "android:name";
      export const PivotX = "android:pivotX";
      export const PivotY = "android:pivotY";
      export const ScaleX = "android:scaleX";
      export const ScaleY = "android:scaleY";
      export const TranslateX = "android:translateX";
      export const TranslateY = "android:translateY";
      export const Rotation = "android:rotation";
    }
  }

  // export namespace ClipPath {
  //     export namespace Attribute {
  //         export const Name = "android:name";
  //         export const PathData = "android:pathData";
  //     }
  // }
}
