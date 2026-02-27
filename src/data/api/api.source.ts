import axios, { AxiosResponse } from 'axios';
import { Token, TokenData, User, UserInput } from './api.model';
import { retry } from '@/general/utils/retry';

const retryDelays = [100, 500, 1000];

export const client = axios.create({ baseURL: 'https://dummyjson.com' });

type ApiSource = {
    auth: {
        login: (data: UserInput) =>
            Promise<AxiosResponse<User, unknown, unknown>>;

        refresh: (data: TokenData) =>
            Promise<AxiosResponse<Token, unknown, unknown>>;
    };
    products: {
        search: (queryString: string) => 
            Promise<AxiosResponse<unknown, unknown, unknown>>;

        get: (queryParams: string) => 
            Promise<AxiosResponse<unknown, unknown, unknown>>;
    };
};

export const apiSource: ApiSource = {
    auth: {
        login: data => {
            return retry(() => client.post('/auth/login', data), retryDelays);
        },
        refresh: data => {
            return retry(() => client.post('/auth/refresh', data), retryDelays);
        },
    },
    products: {
        search: queryParams => {
            return retry(() => client.get(`/products/search?${queryParams}`), retryDelays);
        },
        get: queryParams => {
            return retry(() => client.get(`/products?${queryParams}`), retryDelays);
        },
    },
};
