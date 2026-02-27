import { memo, useEffect, useState } from 'react';

import { IconX } from '@/general/ui/icons';

import { Button } from '../../';

import { Toast, toastBus } from './Toaster.service';
import './Toaster.styles.css';

export type Props = {
    delay?: number;
};

type Component = (props: Props) => JSX.Element;

export const Toaster: Component = memo(props => {
    const { delay = 3000 } = props;

    const [list, setList] = useState<ReadonlyArray<Toast>>([]);

    useEffect(() => {
        const unsubscribe = toastBus.subscribe(({ id, text }) => {
            setList(prev => [...prev, { id, text }]);
            setTimeout(() => setList(prev => prev.filter(t => t.id !== id)), delay);
        });
        return unsubscribe;
    }, [delay]);

    const handleClear = (id: number) => {
        setList(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className='toaster'>
            {list.map(toast => (
                <div key={toast.id} className='toast'>
                    <span>{toast.text}</span>
                    <Button
                        isIcon
                        variant='ghost'
                        text={<IconX />}
                        onClick={() => handleClear(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
}) as Component;
