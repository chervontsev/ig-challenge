import { memo, useMemo } from 'react';

import { Paging } from '@/general/ui';

import { PRODUCTS_PAGE_LIMIT } from '../../Products.model';
import { productsController } from '../../Products.controller';

import { pageStoreHandlers, usePageStore } from './ProductsDataPages.store';
import './ProductsDataPages.styles.css';

type Props = {
    skip: number;
    limit: number;
    total: number;
}

type Component = (props: Props) => JSX.Element;

export const ProductsDataPages: Component = memo(props => {
    const {skip, limit, total } = props;
    const { page } = usePageStore();
    const maxPages = useMemo(() => Math.ceil(total / PRODUCTS_PAGE_LIMIT), [total]);

    const handlePage = (page: number) => {
        pageStoreHandlers.setPage(page);
        productsController.getPaginatedData();
    };

    return (
        <footer className='product-pages'>
            <div className='page-stats'>
                Показано <strong>{skip + 1}-{skip + limit}</strong> из <strong>{total}</strong>
            </div>
            <Paging
                page={page}
                max={maxPages}
                onChange={handlePage}
            />
        </footer>
    );
}) as Component;
