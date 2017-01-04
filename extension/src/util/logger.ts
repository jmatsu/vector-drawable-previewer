export namespace Logger {
    const env: string = "development";

    export function log(m: any) {
        if (env !== "production") {
            console.log(m);
        }
    }
}
