import { createStore, useStore } from 'zustand';

type ProductsPageState = {
    showProductForm: boolean;
};

const initialState: ProductsPageState = {
    showProductForm: false,
};

export const productsPageStore = createStore<ProductsPageState>()(() => ({ ...initialState }));
export const useProductsPageStore = () => useStore(productsPageStore);

type ProductsPageStoreHandlers = {
    setShowProductForm: (flag: boolean) => void;
    reset: () => void;
};

export const productsPageStoreHandlers: ProductsPageStoreHandlers = {
    setShowProductForm: showProductForm => {
        productsPageStore.setState({ showProductForm });
    },
    reset: () => {
        productsPageStore.setState(initialState);
    },
};
