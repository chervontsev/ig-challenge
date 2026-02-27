import { memo } from 'react';
import { Table, SortState } from '@/general/ui';

import { ProductList } from '@/data/services/products.schema';

import { productsController } from '../../Products.controller';

import { ProductCard, ProductAvailability, ProductControls, ProductPrice, ProductRating } from './components';
import { tableStoreHandlers, useTableStore } from './ProductsDataTable.store';
import './ProductsDataTable.styles.css'

const columns = [
    'product',
    'brand',
    'sku',
    'rating',
    'price',
    'availability',
    'controls',
];

const sortableColumns = [
    'rating',
    'price',
];

const headers = {
    id: null,
    product: 'Наименование',
    brand: 'Вендор',
    sku: 'Артикул',
    rating: 'Оценка',
    price: 'Цена, ₽',
    availability: 'Количество',
    controls: null,
};

const mapProductsToTableData = (products: ProductList) => {
    return products.map(product => ({
        id: String(product.id),
        product: <ProductCard thumbnail={product.thumbnail} title={product.title} category={product.category} />,
        brand: <strong>{product.brand}</strong>,
        sku: product.sku,
        rating: <ProductRating rating={product.rating} />,
        price: <ProductPrice price={product.price} />,
        availability: <ProductAvailability availability={product.availabilityStatus} />,
        controls: <ProductControls />,
    }));
};

type Props = {
    data: ProductList;
};

type Component = (props: Props) => JSX.Element;

export const ProductsDataTable: Component = memo(props => {
    const { data } = props;

    const { sort } = useTableStore();

    const handleSort = (sort: SortState) => {
        tableStoreHandlers.setSort({ sortBy: sort.column, order: sort.direction });
        productsController.getPaginatedData();
    };

    return (
        <Table
            columns={columns}
            headers={headers}
            sortedBy={!sort ? null : { column: sort.sortBy, direction: sort.order }}
            sortable={sortableColumns}
            data={mapProductsToTableData(data)}
            onSort={handleSort}
        />
    );
}) as Component;
