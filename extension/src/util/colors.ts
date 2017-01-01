export namespace Colors {
    export function isTransparentCode(code: string): boolean {
        return code === "#00000000" || code === "#0000000";
    }
}
