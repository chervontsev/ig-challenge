import './ProgressBar.styles.css';

import { useEffect, useState } from "react";

type Props = {
    isCompleting: boolean;
};

type Component = (props: Props) => JSX.Element;

export const ProgressBar: Component = props => {
    const { isCompleting } = props;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isCompleting) {
            setProgress(100);
            return;
        }
        const timer = setTimeout(() => setProgress(65), 500);
        return () => clearTimeout(timer);
    }, [isCompleting]);

    return (
        <div className='progress'>
            <div className='progress-fill' style={{ width: `${progress}%` }} />
        </div>
    )
};
