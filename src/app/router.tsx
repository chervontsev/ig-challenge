import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';

import { authService } from '@/data/services/auth.service';
import { Auth, Products } from '@/domains';

import { appStore } from './store';
import { App } from './';

const authLoader = () => {
    const { accessToken } = appStore.getState();
    if (!accessToken) {
        authService.logout();
        throw redirect('/auth');
    };
    return null;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to='products' replace /> },
            { path: 'auth', element: <Auth /> },
            { loader: authLoader, path: 'products', element: <Products /> },
        ],
    },
]);

export const appRouter = {
    toAuth: () => router.navigate('/auth'),
    toProducts: (params?: string) => router.navigate({ pathname: '/products', search: `?${params}` }),
};
