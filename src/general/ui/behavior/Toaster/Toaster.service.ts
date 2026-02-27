export type Toast = { id: number, text: string };

type ToastListener = (toast: Toast) => void;

const listeners = new Set<ToastListener>();

export const toastBus = {
    send: (text: string) => {
        const id = Date.now() + Math.random();
        listeners.forEach(fn => fn({ id, text }));
    },

    subscribe: (callback: ToastListener) => {
        listeners.add(callback);
        return () => {
            listeners.delete(callback)
        };
    }
};
