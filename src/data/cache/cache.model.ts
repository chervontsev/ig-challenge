import { Token } from '../api/api.model';

export type StorageType = 'session' | 'storage';

export type CachedToken = Token & {
    type: StorageType;
};
