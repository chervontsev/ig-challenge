import { ProductFormData, ProductFormErrors } from '../features/ProductForm/ProductForm.store';

type AuthValidators = {
    validateName: (value: string) => string | null;
    validatePrice: (value: string) => string | null;
    validateBrand: (value: string) => string | null;
    validateSku: (value: string) => string | null;
};

export const authValidators: AuthValidators = {
    validateName: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        return null;
    },
    validatePrice: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        if (!parseFloat(value)) {
            return 'Цена должна быть больше нуля';
        }
        return null;
    },
    validateBrand: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        return null;
    },
    validateSku: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        return null;
    },
};

type LoginFormValidated = {
    hasErrors: boolean;
    errors: ProductFormErrors;
    data: ProductFormData;
};

type ValidationService = {
    validateLoginData: (formData: ProductFormData) => LoginFormValidated;
};

export const validationService: ValidationService = {
    validateLoginData: data => {
        const errors = {
            name: authValidators.validateName(data.name),
            price: authValidators.validatePrice(data.price),
            brand: authValidators.validateBrand(data.brand),
            sku: authValidators.validateSku(data.sku),
        }
        const hasErrors = Object.values(errors).some(v => v !== null);
        return { hasErrors, errors, data };
    },
};
