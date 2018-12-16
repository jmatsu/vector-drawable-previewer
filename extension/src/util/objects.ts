export namespace Objects {
    let wait = false;

    export function throttleAfter(f: Function, delay: number) {
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
