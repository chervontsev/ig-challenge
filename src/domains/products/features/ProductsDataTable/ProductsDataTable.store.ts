import { createStore, useStore } from 'zustand';

export type TableSortOptions = 'asc' | 'desc' | null;

export type TableSort = { sortBy: string; order: TableSortOptions };

type TableState = {
    sort: TableSort | null;
};

const initialState: TableState = {
    sort: null,
};

export const tableStore = createStore<TableState>()(() => ({ ...initialState }));
export const useTableStore = () => useStore(tableStore);

type TableStoreHandlers = {
    setSort: (sort: TableSort | null) => void;
    reset: () => void;
};

export const tableStoreHandlers: TableStoreHandlers = {
    setSort: sort => {
        tableStore.setState({ sort });
    },
    reset: () => {
        tableStore.setState(initialState);
    },
};
