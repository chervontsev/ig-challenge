/* eslint-disable */
type Debounce = <Output, Args extends any[]>(fn: (...args: Args) => Output, ms: number) => {
    (...args: Args): void;
    cancel(): void;
};

export const debounce: Debounce = (fn, delay) => {
    type Args = Parameters<typeof fn>;
    type Id = ReturnType<typeof setTimeout> | undefined;
    
    let id: Id;
    
    const debounced = (...args: Args) => {
        id && clearTimeout(id);
        id = setTimeout(() => fn(...args), delay);
    };

    debounced.cancel = () => {
        id && clearTimeout(id);
    };

    return debounced;
};
