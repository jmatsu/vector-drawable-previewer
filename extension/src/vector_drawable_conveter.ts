import { Promise } from 'es6-promise';

export class VectorDrawableConverter {
    convert(vd: any): Promise<any>  {
        return new Impl().convertVD2SVG(vd);
    }
}

class Impl {
    convertVD2SVG(vd: any): Promise<any> { // promiss will return svg element
        return new Promise((resolve, reject) => {
            console.log(vd);
            let svg = this.parseRoot(vd);
            this.appendPathes(vd, svg);
            resolve(svg);
        });
    }

    private createNode(name, attrs): any {
        let node = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (let attrName in attrs) {
            node.setAttributeNS(null, attrName, attrs[attrName]);
        }
        return node;
    }

    parseRoot(vd: any): any {
        const rootAttrs = vd.attributes;
        const vpWidth = rootAttrs['android:viewportWidth'].value.replace('dp', 'px');
        const vpHeight = rootAttrs['android:viewportHeight'].value.replace('dp', 'px');

        return this.createNode('svg', {
            version: '1.1',
            width: rootAttrs['android:width'].value.replace('dp', 'px'),
            height: rootAttrs['android:height'].value.replace('dp', 'px'),
            viewBox: '0 0 ' + vpWidth + ' ' + vpHeight
        });
    }

    appendPathes(vd: any, svg: any) {
        const nodes = vd.childNodes;
        for(let i = 0; i < nodes.length; i++) {
            const node = this.parsePath(nodes[i]);
            if (node !== null) {
                svg.appendChild(node);
            }
        }
    }

    parsePath?(node: any): any {
        if (node.nodeName === 'path') {
            const nodeAttrs = node.attributes;
            return this.createNode('path', {
                d: nodeAttrs['android:pathData'].value,
                stroke: nodeAttrs['android:strokeColor'].value,
                style: 'fill:' + nodeAttrs['android:fillColor'].value + ';',
                'stroke-width': nodeAttrs['android:strokeWidth'].value
            });
        } else {
            return null;
        }
    }
}
