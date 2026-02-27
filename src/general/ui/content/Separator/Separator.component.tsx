import { memo } from 'react';

import './Separator.styles.css';

type Props = {
    text?: string;
};

type Component = (props: Props) => JSX.Element;

export const Separator: Component = memo(props => {
    return (
        <div className='separator'>
            {props.text && (
                <span>{props.text}</span>
            )}
        </div>
    );
}) as Component;
