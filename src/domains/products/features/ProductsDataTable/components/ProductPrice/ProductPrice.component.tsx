import { memo, useMemo } from 'react';

import './ProductPrice.styles.css';

type Props = {
    price: number;
};

type Component = (props: Props) => JSX.Element;

export const ProductPrice: Component = memo(props => {
    const [int, decimal] = useMemo(() => {
        return Intl.NumberFormat('ru-RU').format(props.price).split(',');
    }, [props.price]);

    return (
        <div className='product-price'>
            <span className='product-price-int'>{int}</span>
            <span className='product-price-decimal'>,{decimal}</span>
        </div>
    );
}) as Component;
