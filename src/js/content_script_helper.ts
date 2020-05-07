import { Package } from "./presentation/package_template";
import {
  DirectPackage,
  RawPackage,
  XmlViewerPackage,
} from "./presentation/presentation_component";

const rootNodes: () => NodeList = () => {
  return (document.body || document).childNodes;
};

type Detector = (nodes: NodeList) => Package | null;

const isDirect: Detector = (nodes) => {
  if (nodes.length === 1 && nodes[0].nodeName === "vector") {
    return new DirectPackage();
  } else {
    return null;
  }
};

const isRaw: Detector = (nodes) => {
  if (nodes.length === 1 && nodes[0].nodeName === "PRE") {
    return new RawPackage();
  } else {
    return null;
  }
};

const isXmlViewer: Detector = (nodes) => {
  if (nodes.length === 0) {
    return null;
  }

  const node = nodes[0]

  if (!(node instanceof Element)) {
      return null;
  }

  if (node.nodeName === "div" && node.getAttrValue("id") === "webkit-xml-viewer-source-xml") {
    return new XmlViewerPackage();
  } else {
    return null;
  }
};

const estimateFromContent: () => Package | null = () => {
    const nodes = rootNodes();

    return isDirect(nodes) || isRaw(nodes) || isXmlViewer(nodes);
}

export {
    estimateFromContent,
};