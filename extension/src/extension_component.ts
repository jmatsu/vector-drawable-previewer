import * as PresentationComponent from "./presentation/presentation_component";
import { Documents } from "./util/documents";
import { Logger } from "./util/logger";

export namespace ExtensionComponent {
    export function getPackage(): PresentationComponent.Package {
        const nodes = Documents.getRootNodeList();

        if (isDirectMode(nodes)) {
            Logger.log("Direct mode");
            return new PresentationComponent.DirectPackage();
        } else if (isRawMode(nodes)) {
            Logger.log("Raw mode");
            return new PresentationComponent.RawPackage();
        } else if (isXmlViewerMode(nodes)) {
            Logger.log("Xml viewer mode");
            return new PresentationComponent.XmlViewerPackage();
        } else if (isGithubDiffMode()) {
            Logger.log("Github diff mode");
            return new PresentationComponent.GithubDiffPackage();
        } else if (isGithubBlobMode()) {
            Logger.log("Github blob mode");
            return new PresentationComponent.GithubBlobPackage();
        } else {
            Logger.log("Unknown mode");
            return new PresentationComponent.UnknownPackage();
        }
    }

    function isDirectMode(nodes: NodeList): boolean {
        return nodes.length === 1 && nodes[0].nodeName === "vector";
    }

    function isRawMode(nodes: NodeList): boolean {
        return nodes.length === 1 && nodes[0].nodeName === "PRE";
    }

    function isXmlViewerMode(nodes: NodeList): boolean {
        if (nodes.length === 0) {
            return false;
        }
        if (!(nodes[0] instanceof Element)) {
            return false;
        }

        const node = nodes[0] as Element;
        /* tslint:disable:no-string-literal */
        return node.nodeName === "div" && node.attributes["id"].value === "webkit-xml-viewer-source-xml";
        /* tsslint:enable:no-string-literal */
    }

    function isGithubDiffMode(): boolean {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+\/pull\/[0-9]+\/files/.test(location.href);
    }

    function isGithubBlobMode(): boolean {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+\/blob\/.+?\/res\/[^/]+\/[^.]+\.xml\??.*$/.test(location.href);
    }
}
