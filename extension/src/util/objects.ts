import { Logger } from "./logger";

export namespace Objects {
    let wait = false;

    export function isDefined(obj: any): boolean {
        return obj !== null && obj !== undefined;
    }

    export function throttleAfter(f, delay: number) {
        return () => {
            if (!wait) {
                wait = true;
                setTimeout(() => {
                    f();
                    wait = false;
                }, delay);
            }
        };
    }
}
