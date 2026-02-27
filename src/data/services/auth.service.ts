import { apiSource } from '../api/api.source';
import { User, UserInput } from '../api/api.model';
import { cacheService } from '../cache/cache.service';
import { normalizeError } from '../mappers/normalize-errors';

type FormData = UserInput & { remember: boolean };

type AuthDataService = {
    login: (formData: FormData) => Promise<Pick<User, 'accessToken'>>;
    logout: () => void;
};

export const authService: AuthDataService = {
    login: formData => {
        const { remember, username, password } = formData;

        return apiSource.auth.login({ username, password })
            .then(response => {
                const { accessToken, refreshToken } = response.data;
                const storageType = remember ? localStorage : sessionStorage;
                const type = remember ? 'storage' : 'session';
                const cache = cacheService(storageType);

                cache.set('token', { type, accessToken, refreshToken });

                return Promise.resolve({ accessToken });
            })
            .catch(error => {
                const normalizedError = normalizeError(error);
                return Promise.reject(normalizedError.message);
            });
    },
    logout: () => {
        const storage = cacheService(localStorage);
        const session = cacheService(sessionStorage);
        storage.clearAll();
        session.clearAll();
    },
};
