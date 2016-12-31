import { Documents } from './util/documents';
import * as PresentationComponent from './presentation/presentation_component';

export namespace ExtensionComponent {
    export function getPackage(): PresentationComponent.Package {
        const nodes = Documents.getRootNodeList();

        if (isDirectMode(nodes)) {
            return new PresentationComponent.DirectPackage();
        } else if (isRawMode(nodes)) {
            return new PresentationComponent.RawPackage();
        } else if (isXmlViewerMode(nodes)) {
            return new PresentationComponent.XmlViewerPackage();
        } else if (isGithubDiffMode()) {
            return new PresentationComponent.GithubDiffPackage();
        } else if (isGithubBlobMode()) {
            return new PresentationComponent.GithubBlobPackage();
        } else {
            return new PresentationComponent.UnknownPackage();
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

    function isGithubDiffMode(): boolean {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+\/pull\/[0-9]+\/files/.test(location.href);
    }

    function isGithubBlobMode(): boolean {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+\/blob\/.+?\/res\/[^/]+\/[^.]+\.xml\??.*$/.test(location.href);
    }
}
