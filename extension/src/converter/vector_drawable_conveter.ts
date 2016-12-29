import { Promise } from 'es6-promise';

import { VectorNodeType } from '../const/vector_node_type';
import { Utility } from '../util/utility';

export class VectorDrawableConverter {
    convertToSVG(vd: Node): Promise<Node>  {
        return new SVGWalker().walk(vd, (type: VectorNodeType, node: Node) => {
            switch(type) {
                case VectorNodeType.Root:
                    const rootAttrs = vd.attributes;
                    const width = rootAttrs['android:width'].value.replace('dp', '');
                    const height = rootAttrs['android:height'].value.replace('dp', '');

                    return Utility.createNode('svg', {
                        version: '1.1',
                        width: width + 'px',
                        height: height + 'px',
                        viewBox: '0 0 ' + width + ' ' + height
                    });

                case VectorNodeType.Path:
                    const nodeAttrs = node.attributes;
                    const attrs = {
                        d: nodeAttrs['android:pathData'].value,
                    };

                    this.setValueIfExists(nodeAttrs['android:strokeColor'], attrs, 'stroke');
                    this.setValueIfExists(nodeAttrs['android:strokeWidth'], attrs, 'stroke-width');
                    this.setValueIfExists(nodeAttrs['android:strokeLineCap'], attrs, 'stroke-linecap');
                    this.setValueIfExists(nodeAttrs['android:strokeLineJoin'], attrs, 'stroke-linejoin');

                    const fillColor = nodeAttrs['android:fillColor'].value;
                    if (fillColor !== '#00000000' && fillColor !== '#0000000') {
                        attrs['style'] = 'fill:' + nodeAttrs['android:fillColor'].value + ';'
                    } else {
                        attrs['fill'] = 'none';
                    }

                    return Utility.createNode('path', attrs);

                case VectorNodeType.Rect:

            }

            return null;
        });
    }

    private setValueIfExists(vecAttr: Attr, svgAttrMap, name: string) {
        if (vecAttr !== null && vecAttr !== undefined) {
            svgAttrMap[name] = vecAttr.value;
        }
    }
}

class SVGWalker {
    walk(vd: Node, applier: (VectorNodeType, Node) => Node): Promise<Node> {
        return new Promise((resolve, reject) => {
            const root = applier(VectorNodeType.Root, vd);

            if (root === null || root === undefined) {
                return reject(new Error('Failed to create root node.'));
            }

            const nodes = vd.childNodes;
            console.log(nodes);
            for(let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                switch(node.nodeName) {
                    case 'path':
                        const path = applier(VectorNodeType.Path, node);
                        if (path !== null && path !== undefined) {
                            root.appendChild(path);
                        } else {
                            return reject(new Error('Failed to handle path node.'));
                        }
                        break;
                    case 'rect':
                        const rect = applier(VectorNodeType.Rect, node);
                        if (rect !== null && rect !== undefined) {
                            root.appendChild(rect);
                        } else {
                            return reject(new Error('Failed to handle rect node.'));
                        }
                        break;
                    case '#text':
                        // skip empty string
                        continue;
                    default:
                        return reject(new Error('Found unsupported element <' + node.nodeName + '>'));
                }
            }

            return resolve(root);
        });
    }
}
