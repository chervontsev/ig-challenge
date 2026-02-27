import { memo } from 'react';

import { IconBell, IconControls, IconGlobe, IconMail2, IconSearch } from '@/general/ui/icons';
import { InputText, Button, Counter } from '@/general/ui';

import { productsController } from '../../Products.controller';

import { productsHeaderStoreHandlers, useProductsHeaderStore } from './ProductsHeader.store';
import './ProductsHeader.styles.css';

export const ProductsHeader = memo(() => {
    const { searchQuery, notificationCount } = useProductsHeaderStore();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        productsHeaderStoreHandlers.setSearchQuery(event.target.value);
        productsController.searchProducts();
    };

    return (
        <header className='products-header'>
            <h1>Товары</h1>

            <div className='inner'>
                <InputText
                    className='product-input'
                    id='product-search'
                    name='product-search'
                    placeholder='Найти'
                    prefixIcon={<IconSearch />}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className='menu'>
                    <Button
                        isIcon
                        size='small'
                        variant='ghost'
                        text={<IconGlobe />}
                    />
                    <Button
                        isIcon
                        size='small'
                        variant='ghost'
                        text={<IconBell />}
                        postfixEl={<Counter value={notificationCount} />}
                    />
                    <Button
                        isIcon
                        size='small'
                        variant='ghost'
                        text={<IconMail2 />}
                    />
                    <Button
                        isIcon
                        size='small'
                        variant='ghost'
                        text={<IconControls />}
                    />
                </div>
            </div>
        </header>
    );
});
