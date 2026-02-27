import { createStore, useStore } from 'zustand';

type ProductsHeaderState = {
    searchQuery: string;
    notificationCount: number;
};

const initialState: ProductsHeaderState = {
    searchQuery: '',
    notificationCount: 12,
};

export const productsHeaderStore = createStore<ProductsHeaderState>()(() => ({ ...initialState }));
export const useProductsHeaderStore = () => useStore(productsHeaderStore);

type ProductsHeaderStoreHandlers = {
    setSearchQuery: (value: string) => void;
    setNotificationCount: (value: number) => void;
    reset: () => void;
};

export const productsHeaderStoreHandlers: ProductsHeaderStoreHandlers = {
    setSearchQuery: searchQuery => {
        productsHeaderStore.setState({ searchQuery });
    },
    setNotificationCount: notificationCount => {
        productsHeaderStore.setState({ notificationCount });
    },
    reset: () => {
        productsHeaderStore.setState(initialState);
    },
};
