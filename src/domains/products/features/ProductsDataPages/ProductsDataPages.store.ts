import { createStore, useStore } from 'zustand';

type PagingContext = 'products' | 'search';

type PageState = {
    context: PagingContext,
    page: number;
};

const initialState: PageState = {
    context: 'products',
    page: 1,
};

export const pageStore = createStore<PageState>()(() => ({ ...initialState }));
export const usePageStore = () => useStore(pageStore);

type PageStoreHandlers = {
    setContext: (context: PagingContext) => void;
    setPage: (page: number) => void;
    reset: () => void;
};

export const pageStoreHandlers: PageStoreHandlers = {
    setContext: context => {
        pageStore.setState({ context });
    },
    setPage: page => {
        pageStore.setState({ page });
    },
    reset: () => {
        pageStore.setState(initialState);
    }
};
