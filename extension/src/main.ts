import { VectorDrawableConverter } from './vector_drawable_conveter';
import { VectorDrawableNodeRetriever } from './vector_drawable_node_retriever';
import { Promise } from 'es6-promise';

class Main {
    onLoad() {
        const nodeRetriever = new VectorDrawableNodeRetriever();
        const converter = new VectorDrawableConverter();

        nodeRetriever.fetch().then((e) => {
            return converter.convert(e);
        }).then((svg) => {
            console.log('success');
        }).catch((err) => {
            console.log('failure');
        });
    }
}

document.addEventListener("DOMContentLoaded", new Main().onLoad, false);
