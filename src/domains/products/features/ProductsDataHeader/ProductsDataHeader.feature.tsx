import { memo } from 'react';

import { IconCirclePlus, IconFilter, IconRefresh } from '@/general/ui/icons';
import { Button } from '@/general/ui';

import { productsController } from '../../Products.controller';

import './ProductsDataHeader.styles.css';

export const ProductsDataHeader = memo(() => {
    const handleOpenProductForm = () => {
        productsController.openProductForm();
    };

    return (
        <header className='products-data-header'>
            <h2 className='products-data-title'>
                Все позиции
            </h2>

            <div className='products-data-controls'>
                <Button
                    isIcon
                    size='base'
                    variant='light'
                    text={<IconRefresh />}
                />
                <Button
                    isIcon
                    size='base'
                    variant='light'
                    text={<IconFilter />}
                />
                <Button
                    size='base'
                    variant='primary'
                    text='Добавить'
                    prefixEl={<IconCirclePlus />}
                    onClick={handleOpenProductForm}
                />
            </div>
        </header>
    );
});
