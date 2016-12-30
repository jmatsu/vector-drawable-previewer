export namespace Documents {
    export function getRootNodeList(): NodeList {
        return (document.body || document).childNodes;
    }
}
