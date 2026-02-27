import { ProductParams } from '../api/api.model';
import { apiSource } from '../api/api.source';
import { normalizeError } from '../mappers/normalize-errors';
import { getQueryParams } from '../mappers/query-params';
import { ProductData, validateProductListSchema } from './products.schema';

type ProductsDataService = {
    getProducts: (params: ProductParams) => Promise<ProductData>;
};

export const productsDataService: ProductsDataService = {
    getProducts: params => {
        const queryString = getQueryParams(params);

        const fetchProducts = !params.q?.length
            ? apiSource.products.get
            : apiSource.products.search;

        return fetchProducts(queryString)
            .then(response => {
                const validated = validateProductListSchema(response.data);
                return Promise.resolve(validated);
            })
            .catch(error => {
                const normalizedError = normalizeError(error);
                return Promise.reject(normalizedError.message);
            });
    },
};
