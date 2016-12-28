import { Promise } from 'es6-promise';

export class VectorDrawableNodeRetriever {
    fetch(): Promise<any> {
        return new Impl().fetch();
    }
}

class Impl {
    public node: any

    mayGetNode() {
        const nodes = document.body.childNodes;

        if (nodes.length == 1) {
            const node = nodes[0];

            if (node.nodeName === "vector") {
                this.node = node;
            }
        }
    }

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mayGetNode();

            if (this.node !== null) {
                resolve(this.node);
            } else {
                reject(new Error("Not vector node."));
            }
        });
    }
}
