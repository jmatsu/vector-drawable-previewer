import { Objects } from './objects';
import { Nodes } from './nodes';

export namespace Githubs {
    export function obtainFromFilePreview(file: Element): string {
        const codes = file.querySelectorAll('td.blob-code');

        if (!Objects.isDefined(codes) || codes.length == 0) {
            return null;
        }

        let text = '';

        for(let i = 0, end = codes.length; i < end; i++) {
            const t = digTextRow(codes[i]);
            text += (t + '\n');
        }

        return text;
    }

    function digTextRow(row: Node) {
        let text = '';
        const nodes = row.childNodes;
        for(let i = 0, end = nodes.length; i < end; i++) {
            const node = nodes[i];
            if (nodes[i].nodeName === '#text') {
                text += node.textContent;
            } else {
                text += digTextRow(node);
            }
        }
        return text;
    }

    export function obtainFromFileDiff(file: Element): string {
        const indices = file.querySelectorAll('table.diff-table td:nth-child(2)');
        if (!Objects.isDefined(indices) || indices.length < 2) {
            return null;
        }

        let content = '';

        for(let i = 1, end=indices.length; i < end; i++) {
            const index = indices[i];
            if (Nodes.hasClass(index, 'empty-cell')) {
                continue;
            }
            const line = index.parentElement.querySelector('td:nth-child(3)');
            const span = line && line.querySelector('span.blob-code-inner');
            if (!Objects.isDefined(span)) {
                return null;
            }

            const text = span.textContent;

            if (Nodes.hasClass(index, 'blob-num-deletion') || Nodes.hasClass(index, 'blob-num-addition')) {
                content += (text.substring(1, text.length) + '\n');
            } else {
                content += (text + '\n');
            }
        }

        return content;
    }
}
