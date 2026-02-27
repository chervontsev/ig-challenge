import { createStore, useStore } from 'zustand';

export type ProductFormData = {
    name: string;
    price: string;
    brand: string;
    sku: string;
};

export type ProductFormErrors = {
    name: string | null;
    price: string | null;
    brand: string | null;
    sku: string | null;
};

type ProductFormState = {
    formData: ProductFormData;
    formErrors: ProductFormErrors;
};

const initialState: ProductFormState = {
    formData: {
        name: '',
        price: '',
        brand: '',
        sku: '',
    },
    formErrors: {
        name: null,
        price: null,
        brand: null,
        sku: null,
    },
};

export const productFormStore = createStore<ProductFormState>()(() => ({ ...initialState }));
export const useProductFormStore = () => useStore(productFormStore);

type ProductFormHandlers = {
    setField: (key: string, value: string) => void;
    setFieldError: (key: string, error: string | null) => void;
    setFieldErrors: (formErrors: ProductFormErrors) => void;
    reset: () => void;
}
export const productFormStoreHandlers: ProductFormHandlers = {
    setField: (key, value) => {
        productFormStore.setState(state => {
            const formData = { ...state.formData, [key]: value };
            return { formData };
        });
    },
    setFieldError: (key, error) => {
        productFormStore.setState(state => {
            const formErrors = { ...state.formErrors, [key]: error };
            return { formErrors };
        });
    },
    setFieldErrors: formErrors => {
        productFormStore.setState({ formErrors });
    },
    reset: () => {
        productFormStore.setState(initialState);
    },
};
