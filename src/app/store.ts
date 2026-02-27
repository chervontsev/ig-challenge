import { createStore, useStore } from 'zustand';

import { cacheService } from '@/data/cache/cache.service';
import { CachedToken } from '@/data/cache/cache.model';

type AppState = {
    storageType: CachedToken['type'] | null;
    accessToken: string | null;
};

type GetInitialState = () => AppState;

const getInitialState: GetInitialState = () => {
    const storage = cacheService(localStorage);
    const session = cacheService(sessionStorage);
    const sessionToken = storage.get<CachedToken>('token');
    const storageToken = session.get<CachedToken>('token');
    const result: AppState = { storageType: null, accessToken: null };

    if (sessionToken) {
        result.accessToken = sessionToken.accessToken;
        result.storageType = sessionToken.type;
    }
    if (storageToken) {
        result.accessToken = storageToken.accessToken;
        result.storageType = storageToken.type;
    }
    return result;
};

const initialState: AppState = {
    ...getInitialState(),
};

export const appStore = createStore<AppState>()(() => ({ ...initialState }));
export const useAuthStore = () => useStore(appStore);

type AppStoreHandlers = {
    setToken: (accessToken: string | null) => void;
    reset: () => void;
}
export const appStoreHandlers: AppStoreHandlers = {
    setToken: accessToken => {
        appStore.setState({ accessToken });
    },
    reset: () => {
        localStorage.removeItem('token');
        appStore.setState(initialState);
    },
};
