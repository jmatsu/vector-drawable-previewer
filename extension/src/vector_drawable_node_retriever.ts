import { Promise } from 'es6-promise';

export class VectorDrawableNodeRetriever {
    fetch(): Promise<any> {
        return new Impl().fetch();
    }
}

class Impl {
    public node: any

    mayGetNode() {
        let nodes = document.body.childNodes;

        if (nodes.length > 0) {
            let node = nodes[0];

            if (node.nodeName === "vector") {
                this.node = node;
            } else if (node.nodeName === "div" && node.attributes['id'].value === 'webkit-xml-viewer-source-xml') {
                nodes = node.childNodes;

                if (nodes.length == 1) {
                    node = nodes[0];

                    if (node.nodeName === "vector") {
                        this.node = node;
                    }
                }
            }
        }
    }

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mayGetNode();

            if (this.node !== null && this.node !== undefined) {
                resolve(this.node);
            } else {
                reject(new Error("Not vector node."));
            }
        });
    }
}
