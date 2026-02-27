import { createPortal } from 'react-dom';

import { Popover, Toaster } from '@/general/ui';

import { ProductsHeader, ProductsData, ProductForm } from './features';
import { useProductsPageStore } from './Products.store';
import './Products.styles.css';

export const Products = () => {
    const { showProductForm } = useProductsPageStore();

    return (
        <div className='products-page'>
            <ProductsHeader />
            <ProductsData />
            <Toaster />
            {showProductForm ? createPortal(
                <Popover>
                    <ProductForm />
                </Popover>,
                document.body,
            ) : null}
        </div>
    );
};
