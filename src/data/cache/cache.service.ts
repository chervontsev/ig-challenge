type CacheService = (storage: Storage) => {
    get: <Data>(key: string) => Data | null;
    set: <Data>(key: string, data: Data) => void;
    clear: (key: string) => void;
    clearAll: () => void;
};

export const cacheService: CacheService = storage => ({
    get: key => {
        const data = storage.getItem(key);
        if (!data) {
            return null;
        }
        try {
            return JSON.parse(data);
        }
        catch {
            storage.removeItem(key);
            return null;
        }
    },
    set: (key, data) => {
        try {
            storage.setItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.error('Cache storage full:', error);
        }
    },
    clear: key => {
        storage.removeItem(key);
    },
    clearAll: () => {
        storage.clear();
    },
});
