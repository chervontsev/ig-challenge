import { memo, useCallback, useRef } from 'react';

import { InputPrice, InputText, Button } from '@/general/ui';
import { useClickOutside } from '@/general/hooks/use-click-outside';

import { productsController } from '../../Products.controller';

import { productFormStoreHandlers, useProductFormStore } from './ProductForm.store';
import './ProductForm.styles.css';

type HandleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
type HandleFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => void;
type HandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => void;

export const ProductForm = memo(() => {
    const rootRef = useRef<HTMLDivElement>(null);
    const { formData, formErrors } = useProductFormStore();

    const handleFieldChange: HandleFieldChange = useCallback(event => {
        const { name, value } = event.target;
        productFormStoreHandlers.setField(name, value)
    }, []);

    const handleFieldFocus: HandleFieldFocus = useCallback(event => {
        const { name } = event.target;
        productFormStoreHandlers.setFieldError(name, null);
    }, []);

    const handleFormCancel = useCallback(() => {
        productsController.closeProductForm();
    }, []);

    const handleFormSubmit: HandleFormSubmit = useCallback(event => {
        event.preventDefault();
        productsController.submitProductForm();
    }, []);

    useClickOutside(rootRef, productsController.closeProductForm);

    return (
        <div ref={rootRef} className='product-form'>
            <div className='product-form-header'>
                <h4>Добавить новый товар</h4>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className='product-form-fields'>
                    <InputText
                        className='product-input'
                        labelText='Наименование'
                        id='product-form-name'
                        name='name'
                        errorMessage={formErrors.name}
                        value={formData.name}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                    />
                    <InputPrice
                        className='product-input'
                        labelText='Цена'
                        id='product-form-price'
                        name='price'
                        errorMessage={formErrors.price}
                        value={formData.price}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                    />
                    <InputText
                        className='product-input'
                        labelText='Вендор'
                        id='product-form-brand'
                        name='brand'
                        errorMessage={formErrors.brand}
                        value={formData.brand}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                    />
                    <InputText
                        className='product-input'
                        labelText='Артикул'
                        id='product-form-sku'
                        name='sku'
                        errorMessage={formErrors.sku}
                        value={formData.sku}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                    />
                </div>

                <div className='product-form-controls'>
                    <Button
                        variant='light'
                        text='Отмена'
                        onClick={handleFormCancel}
                    />
                    <Button
                        type='submit'
                        variant='primary'
                        text='Отправить'
                    />
                </div>
            </form>
        </div>
    );
});
