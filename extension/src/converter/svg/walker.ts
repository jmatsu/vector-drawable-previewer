import { Promise } from "es6-promise";

import { VectorNode } from "../../const/vector_node";
import { Objects } from "../../util/objects";

export class Walker {
    public walk(vd: Node, applier: (VectorNodeType, Node) => Node): Promise<Node> {
        return new Promise((resolve, reject) => {
            const root = applier(VectorNode.Type.Root, vd);

            if (!Objects.isDefined(root)) {
                return reject(new Error("Failed to create root node."));
            }

            try {
                this.iterate(root, vd.childNodes, applier);
                return resolve(root);
            } catch (err) {
                return reject(err);
            }
        });
    }

    private iterate(parent: Node, nodes: NodeList, applier: (VectorNodeType, Node) => Node) {
        for (const data of this.dataGenerator(nodes)) {
            const n = applier(data.type, data.node);

            if (!Objects.isDefined(n)) {
                throw new Error(`Failed to handle ${data.type} node.`);
            }

            parent.appendChild(n);

            if (data.type == VectorNode.Type.Group) {
                this.iterate(n, data.node.childNodes, applier);
            }
        }
    }

    private *dataGenerator(nodes: NodeList) {
        for (const node of nodes) {
            switch (node.nodeName) {
                case "path":
                    yield new VectorNode.Data(VectorNode.Type.Path, node);
                    continue;
                case "group":
                    yield new VectorNode.Data(VectorNode.Type.Group, node);
                    continue;
                case "#text":
                    // skip empty string
                    continue;
                default:
                    throw new Error("Found unsupported element <" + node.nodeName + ">");
            }
        }
    }
}
