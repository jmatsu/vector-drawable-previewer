import { Logger } from "./logger";

export namespace Githubs {
    export function isGithubRepositoryPage() {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+.*/.test(location.href);
    }

    export function isGithubBlobPage(): boolean {
        return /https?:\/\/github\.com\/[^/]+\/[^/]+\/blob\/.*$/.test(location.href);
    }

    export function getAjaxContainer() {
        return document.querySelector("#js-repo-pjax-container");
    }

    export function obtainFromFilePreview(file: Element): string | null {
        const codes = file.querySelectorAll("td.blob-code");

        if (!codes || codes.length === 0) {
            Logger.log(`!codes || codes.length === 0 => ${!codes} || ${codes.length === 0}`);
            return null;
        }

        let content = "";

        for (const code of codes) {
            content += `${digTextRow(code)}\n`;
        }

        Logger.log("---- begin content ----");
        Logger.log(content);
        Logger.log("---- end content ----");
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
        Logger.log(`row text: ${text}`);
        return text;
    }

    export function obtainFromFileDiff(file: Element): string | null {
        const indices = file.querySelectorAll("table.diff-table td:nth-child(2)");
        if (!indices || indices.length < 2) {
            Logger.log(`!indices || indices.length < 2 => ${!indices} || ${indices.length < 2}`);
            return null;
        }

        let content = "";
        let skip = true;

        for (const index of indices) {
            if (skip) {
                skip = false;
                continue;
            }
            if (index.hasClass("empty-cell")) {
                Logger.log("skip empty cell");
                continue;
            }
            const line = index.parentElement!.querySelector("td:nth-child(3)");
            const span = line && line.querySelector("span.blob-code-inner");

            if (!span) {
                Logger.log("span is not found");
                Logger.log(line);
                return null;
            }

            const text = span.textContent;

            if (text && (index.hasClass("blob-num-deletion") || index.hasClass("blob-num-addition"))) {
                content += `${text.substring(1, text.length)}\n`;
            } else {
                content += `${text}\n`;
            }
        }

        Logger.log("---- begin content ----");
        Logger.log(content);
        Logger.log("---- end content ----");
        return content;
    }
}
