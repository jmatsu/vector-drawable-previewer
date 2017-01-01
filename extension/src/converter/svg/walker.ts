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

            const nodes = vd.childNodes;

            for (const node of nodes) {
                switch (node.nodeName) {
                    case "path":
                        const path = applier(VectorNode.Type.Path, node);
                        if (!Objects.isDefined(path)) {
                            return reject(new Error("Failed to handle path node."));
                        } else {
                            root.appendChild(path);
                        }
                        break;
                    case "#text":
                        // skip empty string
                        continue;
                    default:
                        return reject(new Error("Found unsupported element <" + node.nodeName + ">"));
                }
            }

            return resolve(root);
        });
    }
}
