import { Promise } from 'es6-promise';

export abstract class VectorDrawableNodeRetriever {
    abstract mayRetrieveNode(): Node;

    retrieve(): Promise<Node> {
        return new Promise((resolve, reject) => {
            const node = this.mayRetrieveNode();

            if (node !== null && node !== undefined) {
                resolve(node);
            } else {
                reject(new Error("Not vector file."));
            }
        });
    }
}
