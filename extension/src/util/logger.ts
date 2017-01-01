export namespace Logger {
    const env = process.env.NODE_ENV || "development";

    export function log(m: any) {
        if (env !== "production") {
            console.log(m);
        }
    }
}
