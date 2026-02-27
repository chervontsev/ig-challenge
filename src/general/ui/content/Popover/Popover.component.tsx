import { memo, PropsWithChildren } from 'react';

import './Popover.styles.css';

type Props = PropsWithChildren;

type Component = (props: Props) => JSX.Element;

export const Popover: Component = memo(props => (
    <div className='popover'>
        {props.children}
    </div>
)) as Component;
