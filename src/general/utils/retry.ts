
export const retry = <Value>(thunk: () => Promise<Value>, delays: Array<number>): Promise<Value> => {
    const attempt = (index: number): Promise<Value> => {
        return thunk().catch(error => {
            if (index >= delays.length) {
                return Promise.reject(error);
            }
            const delayMs = delays[index];
            if (delayMs > 0) {
                return new Promise<Value>((resolve, reject) =>
                    setTimeout(() => attempt(index + 1).then(resolve, reject), delayMs)
                );
            }
            return attempt(index + 1);
        });
    };
    return attempt(0);
};