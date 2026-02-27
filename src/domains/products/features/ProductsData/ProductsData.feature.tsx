import { memo, useEffect } from 'react';

import { Query } from '@/general/ui';

import { ProductsDataPages, ProductsDataHeader, ProductsDataTable } from '..';
import { productsController } from '../../Products.controller';

import { useProductsDataStore } from './ProductsData.store';
import './ProductsData.styles.css';

export const ProductsData = memo(() => {
    const query = useProductsDataStore();
    
    useEffect(() => productsController.getPaginatedData(), []);

    return (
        <section className='products-data'>
            <ProductsDataHeader />

            <Query state={query} success={data => (
                <>
                    <ProductsDataPages
                        limit={data.limit}
                        skip={data.skip}
                        total={data.total}
                    />
                    <ProductsDataTable
                        data={data.products}
                    />
                </>
            )} />
        </section>
    );
});
