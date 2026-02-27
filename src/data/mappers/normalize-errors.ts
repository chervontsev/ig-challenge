import { isAxiosError } from 'axios';

export type ErrorData = {
    type: 'client_error' | 'server_error' | 'network_error' | 'cancelled' | 'timeout' | 'unknown';
    message: string;
    statusCode?: number;
    responseData?: unknown;
};

type NormalizeError = (error: unknown) => ErrorData;

export const normalizeError: NormalizeError = error => {
    if (isAxiosError(error)) {
        if (error.code === 'ERR_CANCELED') {
            return { type: 'cancelled', message: error.message };
        }

        if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
            return { type: 'timeout', message: error.message };
        }

        if (error.response) {
            const status = error.response.status;
            const isClientError = status >= 400 && status < 500;

            return {
                type: isClientError ? 'client_error' : 'server_error',
                message: error.response.data?.message || error.message,
                statusCode: status,
                responseData: error.response.data,
            };
        }

        return {
            type: 'network_error',
            message: error.message,
        };
    }

    if (error instanceof Error) {
        return { type: 'unknown', message: error.message };
    }

    return { type: 'unknown', message: 'Unknown error' };
};
