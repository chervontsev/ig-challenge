import { createStore, useStore } from 'zustand';

import { ProductData } from '@/data/services/products.schema';

type ProductsDataState = {
    isLoading: boolean;
    error: string | null;
    data: ProductData | undefined;
};

const initialState: ProductsDataState = {
    isLoading: false,
    error: null,
    data: undefined,
};

export const productsDataStore = createStore<ProductsDataState>()(() => ({ ...initialState }));
export const useProductsDataStore = () => useStore(productsDataStore);

type ProductsDataStoreHandlers = {
    setIsLoading: () => void;
    setError: (error: string | null) => void;
    setData: (data: ProductData) => void;
    reset: () => void;
};

export const productsDataStoreHandlers: ProductsDataStoreHandlers = {
    setIsLoading: () => {
        productsDataStore.setState({ ...initialState, isLoading: true });
    },
    setError: error => {
        productsDataStore.setState({ ...initialState, error });
    },
    setData: data => {
        productsDataStore.setState({ ...initialState, data });
    },
    reset: () => {
        productsDataStore.setState(initialState);
    },
};
