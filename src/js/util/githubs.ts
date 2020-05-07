export namespace Githubs {
    export function isGithubRepositoryPage() {
        return /https?:\/\/github\.com\/[^\/]+\/[^\/]+.*/.test(location.href);
    }

    export function isGithubBlobPage(): boolean {
        return /https?:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/.*$/.test(location.href);
    }

    export function getAjaxContainer() {
        return document.querySelector("#js-repo-pjax-container");
    }

    export function obtainFromFilePreview(file: Element): string | null {
        const codes = file.querySelectorAll("td.blob-code");

        if (!codes || codes.length === 0) {
            return null;
        }

        let content = "";

        for (const code of codes) {
            content += `${digTextRow(code)}\n`;
        }

        return content;
    }

    function digTextRow(row: Node) {
        let text = "";
        for (const node of row.childNodes) {
            if (node.nodeName === "#text") {
                text += node.textContent;
            } else {
                text += digTextRow(node);
            }
        }

        return text;
    }

    export function obtainFromFileDiff(file: Element): string | null {
        const indices = file.querySelectorAll("table.diff-table td:nth-child(4)");
        if (!indices || indices.length < 2) {
            return null;
        }

        let content = "";

        for (const index of indices) {
            if (index.hasClass("empty-cell")) {
                continue;
            }
            const line = index.parentElement!.querySelector("td:nth-child(4)");
            const span = line && line.querySelector("span.blob-code-inner");

            if (!span) {
                return null;
            }

            const text = span.textContent;

            if (text && (index.hasClass("blob-num-deletion") || index.hasClass("blob-num-addition"))) {
                content += `${text.substring(1, text.length)}\n`;
            } else {
                content += `${text}\n`;
            }
        }

        return content;
    }
}
