import { memo } from 'react';

import { Image } from '@/general/ui';

import './ProductCard.styles.css';

type Props = {
    thumbnail: string;
    title: string;
    category: string;
};

type Component = (props: Props) => JSX.Element;

export const ProductCard: Component = memo(props => (
    <div className='product-card'>
        <div className='product-card-image'>
            <Image
                imageSrc={props.thumbnail}
                width='48'
                height='48'
            />
        </div>
        <div className='product-card-info'>
            <h4 className='product-card-title'>{props.title}</h4>
            <span className='product-card-category'>{props.category}</span>
        </div>
    </div>
)) as Component;