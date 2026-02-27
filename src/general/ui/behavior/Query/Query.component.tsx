import { memo, useEffect, useMemo, useState } from 'react';

import { ProgressBar } from '../ProgressBar/ProgressBar.component';

import './Query.styles.css';

type Props<Type> = {
    state: {
        isLoading: boolean;
        error: string | null;
        data: Type | undefined;
    };
    success: (data: Type) => JSX.Element;
};

type Component = <Type>(props: Props<Type>) => JSX.Element;

export const Query: Component = memo(props => {
    const { state, success } = props;
    const { isLoading, error, data } = state;
    const [showContent, setShowContent] = useState(false);
    const isCompleting = useMemo(() => Boolean(!isLoading && data), [isLoading, data]);

    useEffect(() => {
        if (!isLoading && data) {
            const timer = setTimeout(() => setShowContent(true), 400);
            return () => clearTimeout(timer);
        }
        if (isLoading) {
            setShowContent(false);
        }
    }, [isLoading, data]);

    return (
        <>
            {(isLoading || (data && !showContent)) && (
                <div className='query-loader'>
                    <ProgressBar isCompleting={isCompleting} />
                </div>
            )}
            {error && (
                <div className='query-error'>
                    {error}
                </div>
            )}
            {!isLoading && !error && !data &&
                <div className='query-no-data'>
                    Нет данных
                </div>
            }
            {showContent && data &&
                success(data)
            }
        </>
    );
}) as Component;
