import { Documents } from '../util/documents';
import { Package } from './package_template';
import { DirectPackage } from './direct/package';
import { RawPackage } from './raw/package';
import { UnknownPackage } from './unknown/package';
import { XmlViewerPackage } from './xmlviewer/package';

export namespace PresentationComponent {
    export function getPackage(): Package {
        const nodes = Documents.getRootNodeList();

        if (isDirectMode(nodes)) {
            return new DirectPackage();
        } else if (isRawMode(nodes)) {
            return new RawPackage();
        } else if (isXmlViewerMode(nodes)) {
            return new XmlViewerPackage();
        } else {
            return new UnknownPackage();
        }
    }

    function isDirectMode(nodes: NodeList): boolean {
        return nodes.length === 1 && nodes[0].nodeName === 'vector';
    }

    function isRawMode(nodes: NodeList): boolean {
        return nodes.length === 1 && nodes[0].nodeName === 'PRE';
    }

    function isXmlViewerMode(nodes: NodeList): boolean {
        if (nodes.length === 0) {
            return false;
        }

        const node = nodes[0];
        return node.nodeName === 'div' && node.attributes['id'].value === 'webkit-xml-viewer-source-xml';
    }
}
