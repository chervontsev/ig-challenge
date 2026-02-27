import { memo } from 'react';
import classNames from 'classnames';

import './ProductRating.styles.css';

type Props = {
    rating: number;
}

type Component = (props: Props) => JSX.Element;

export const ProductRating: Component = memo(props => {
    const isLow = props.rating <= 3.5;

    return (
        <div className={classNames('product-rating', { 'product-rating-low': isLow })}>
            <span>{props.rating}</span>/5
        </div>
    );
}) as Component;
