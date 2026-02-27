import { memo, useMemo } from 'react';
import classNames from 'classnames';

import './ProductAvailability.styles.css';

type Props = {
    availability: string;
};

type Component = (props: Props) => JSX.Element;

export const ProductAvailability: Component = memo(props => {
    const status = useMemo(() => {
        if (props.availability === 'In Stock') return 'product-availability-normal';
        if (props.availability === 'Low Stock') return 'product-availability-low';
        return 'product-availability-out';
    }, [props.availability]);

    return (
        <div className={classNames('product-availability', status)}>
            <span />
            <span />
            <span />
        </div>
    );
}) as Component;
