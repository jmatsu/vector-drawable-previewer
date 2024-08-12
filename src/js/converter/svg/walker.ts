import * as Id from "../../const/id";
import { VectorNode } from "../../const/vector_node";

export class Walker {
  public walk(
    data: VectorNode.Data,
    applier: (data: VectorNode.Data) => SVGElement | null,
  ): Promise<SVGElement> {
    return new Promise((resolve, reject) => {
      const root = applier(data);

      if (!root) {
        return reject(new Error("Failed to create root node."));
      }

      try {
        this.iterate(
          root.querySelector(`#${Id.topGroup}`),
          data.element.childNodes,
          applier,
        );
        return resolve(root);
      } catch (err) {
        return reject(err);
      }
    });
  }

  private iterate(
    parent: Node | null,
    nodes: NodeList,
    applier: (data: VectorNode.Data) => SVGElement | null,
  ) {
    if (!parent) {
      return;
    }

    for (const data of this.dataGenerator(nodes)) {
      const n = applier(data);

      if (!n) {
        throw new Error(`Failed to handle ${data.type} node.`);
      }

      parent.appendChild(n);

      if (data.hasChildren()) {
        this.iterate(n, data.element.childNodes, applier);
      }
    }
  }

  private *dataGenerator(nodes: NodeList) {
    for (const node of nodes) {
      if (!node) {
        throw new Error("node must not be null");
      }

      switch (node.nodeName) {
        case "path":
          yield new VectorNode.Data(VectorNode.Type.Path, node as Element);
          continue;
        case "group":
          yield new VectorNode.Data(VectorNode.Type.Group, node as Element);
          continue;
        case "#text":
        case "#comment":
          // skip empty string and comment
          continue;
        default:
          throw new Error("Found unsupported element <" + node.nodeName + ">");
      }
    }
  }
}
