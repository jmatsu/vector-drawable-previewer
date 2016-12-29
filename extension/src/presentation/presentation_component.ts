import { Utility } from '../util/utility';
import { Package } from './package_template';
import { DirectPackage } from './direct/package';
import { RawPackage } from './raw/package';
import { UnknownPackage } from './unknown/package';
import { XmlViewerPackage } from './xmlviewer/package';

export namespace PresentationComponent {
    export function getPackage(): Package {
        if (Helper.isDirectMode()) {
            return new DirectPackage();
        } else if (Helper.isRawMode()) {
            return new RawPackage();
        } else if (Helper.isXmlViewerMode()) {
            return new XmlViewerPackage();
        } else {
            return new UnknownPackage();
        }
    }
}

namespace Helper {
    function getRootNodes(): NodeList {
        return (document.body || document).childNodes;
    }

    export function isDirectMode(): boolean {
        const nodes = getRootNodes();
        return nodes.length === 1 && nodes[0].nodeName === 'vector';
    }

    export function isRawMode(): boolean {
        const nodes = getRootNodes();
        return nodes.length === 1 && nodes[0].nodeName === 'PRE';
    }

    export function isXmlViewerMode(): boolean {
        const nodes = getRootNodes();

        if (nodes.length === 0) {
            return false;
        }

        const node = nodes[0];
        return node.nodeName === 'div' && node.attributes['id'].value === 'webkit-xml-viewer-source-xml';
    }
}
