import { useEffect, RefObject } from 'react';

type UseClickOutside = <El extends HTMLElement = HTMLElement>(
    ref: RefObject<El>,
    handler: (event: MouseEvent | TouchEvent) => void
) => void;

type Listener = (event: MouseEvent | TouchEvent) => void;

export const useClickOutside: UseClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener: Listener = event => {
            const element = ref.current;
            if (!element || element.contains(event.target as Node)) return;
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
