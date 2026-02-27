import React, { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { IconChevronLeft, IconChevronRight } from '@/general/ui/icons';

import './Paging.styles.css';

type Props = {
    page: number;
    max: number;
    min?: number;
    size?: number;
    onChange: (page: number) => void;
};

type Component = (props: Props) => JSX.Element;

export const Paging: Component = memo((props: Props) => {
    const { page, max, min = 1, size = 5, onChange } = props;
    
    const mid = useMemo(() => Math.floor(size / 2), [size]);
    const count = useMemo(() => size < max ? size : max, [max, size]);

    const range = useMemo(() => {
        let modifier = page - mid;
        if (page <= mid) modifier = 1;
        if (page + mid >= max) modifier = 1 + max - count;
        return Array.from({ length: count }).map((_, index) => index + modifier);
    }, [page, count, mid, max])

    const handlePageClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.target instanceof HTMLElement) {
            const { page } = event.target.dataset;
            onChange(Number(page));
        }
    }, [onChange]);

    const handlePrev = useCallback(() => {
        const out = page - 1 <= min ? min : page - 1;
        onChange(out);
    }, [page, min, onChange]);

    const handleNext = useCallback(() => {
        const out = page + 1 >= max ? max : page + 1;
        onChange(out);
    }, [page, max, onChange]);

    return (
        <div className='paging'>
            <button
                className='page-arrow'
                disabled={page === 1}
                onClick={handlePrev}
            >
                <IconChevronLeft />
            </button>

            {range.map(num => {
                return (
                    <button
                        key={`paging-button-${num}`}
                        data-page={num}
                        className={classNames('page', { 'current': num === page })}
                        onClick={handlePageClick}
                    >
                        {num}
                    </button>
                )
            })}

            <button
                className='page-arrow'
                disabled={page === max}
                onClick={handleNext}
            >
                <IconChevronRight />
            </button>
        </div>
    );
}) as Component;
