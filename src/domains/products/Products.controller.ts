import { productsDataService } from '@/data/services/products.service';

import { debounce } from '@/general/utils/debounce';

import { productsDataStoreHandlers } from './features/ProductsData/ProductsData.store';
import { productFormStore, productFormStoreHandlers } from './features/ProductForm/ProductForm.store';
import { productsHeaderStore, productsHeaderStoreHandlers } from './features/ProductsHeader/ProductsHeader.store';
import { pageStore, pageStoreHandlers } from './features/ProductsDataPages/ProductsDataPages.store';
import { tableStore, tableStoreHandlers } from './features/ProductsDataTable/ProductsDataTable.store';

import { productsPageStoreHandlers } from './Products.store';
import { PRODUCTS_PAGE_LIMIT, SEARCH_DELAY_TIME } from './Products.model';
import { appRouter } from '@/app/router';
import { getQueryParams } from '@/data/mappers/query-params';
import { validationService } from './services/validation.service';
import { toastBus } from '@/general/ui';

type ProductsController = {
    searchProducts: ReturnType<typeof debounce>;
    getPaginatedData: () => void;
    openProductForm: () => void;
    closeProductForm: () => void;
    submitProductForm: () => void;
};

export const productsController: ProductsController = {
    searchProducts: debounce(() => {
        pageStore.setState({ page: 1, context: 'search' });
        productsController.getPaginatedData();
    }, SEARCH_DELAY_TIME),

    getPaginatedData: () => {
        productsDataStoreHandlers.setIsLoading();

        const { searchQuery } = productsHeaderStore.getState();
        const { page, context } = pageStore.getState();
        const { sort } = tableStore.getState();

        const limit = PRODUCTS_PAGE_LIMIT;
        const skip = PRODUCTS_PAGE_LIMIT * (page - 1);
        const paramsStr = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(paramsStr);

        let sortOptions = {};
        if (sort) {
            sortOptions = !sort?.order ? {} : { ...sort };
            const newParams = getQueryParams(sortOptions);
            appRouter.toProducts(newParams);
        }
        else if (urlParams.sortBy && urlParams.order === 'asc' || urlParams.order === 'desc') {
            const { sortBy, order } = urlParams;
            tableStoreHandlers.setSort({ sortBy, order });
            sortOptions = { sortBy, order };
        }

        let contextParams = {};
        if (context === 'products') {
            contextParams = { limit, skip };
            productsController.searchProducts.cancel();
            if (searchQuery.length) {
                productsHeaderStoreHandlers.setSearchQuery('');
            }
        }
        if (!searchQuery.length && context === 'search') {
            contextParams = { limit, skip };
            pageStoreHandlers.reset();
        }
        else if (searchQuery.length && context === 'search') {
            contextParams = { q: searchQuery, limit, skip };
        }

        productsDataService.getProducts({ ...contextParams, ...sortOptions })
            .then(productsDataStoreHandlers.setData)
            .catch(productsDataStoreHandlers.setError);
    },

    openProductForm: () => {
        productsPageStoreHandlers.setShowProductForm(true);
    },

    closeProductForm: () => {
        productsPageStoreHandlers.setShowProductForm(false);
        productFormStoreHandlers.reset();
    },

    submitProductForm: () => {
        const { formData } = productFormStore.getState();
        const validated = validationService.validateLoginData(formData);

        if (validated.hasErrors) {
            return productFormStoreHandlers.setFieldErrors(validated.errors);
        }
        productsPageStoreHandlers.setShowProductForm(false);
        productFormStoreHandlers.reset();
        console.log(validated.data);
        toastBus.send('Товар успешно добавлен');
    },
};
