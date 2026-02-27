import * as v from 'valibot';

const productIdSchema = v.pipe(
    v.number(),
    v.integer(), 
    v.brand('ProductId'),
);

export const productSchema = v.pipe(
    v.object({
        id: productIdSchema,
        sku: v.string(),
        brand: v.optional(v.string()),
        title: v.string(),
        category: v.string(),
        thumbnail: v.string(),
        rating: v.number(),
        price: v.number(),
        availabilityStatus: v.union([
            v.literal('In Stock'),
            v.literal('Low Stock'),
            v.literal('Out of Stock'),
        ]),
    }),
    v.readonly(),
);

const productListSchema = v.pipe(
    v.array(productSchema),
    v.readonly(),
);

const productDataSchema = v.pipe(
    v.object({
        products: productListSchema,
        limit: v.number(),
        skip: v.number(),
        total: v.number(),
    }),
    v.readonly(),
);

export type Product = v.InferOutput<typeof productSchema>;
export type ProductList = v.InferOutput<typeof productListSchema>;
export type ProductData = v.InferOutput<typeof productDataSchema>;

export type ProductId = v.InferOutput<typeof productIdSchema>;
export const toProductId = (value: number): ProductId => value as ProductId;

export const validateProductListSchema = (data: unknown) => {
    const result = v.safeParse(productDataSchema, data);
    if (!result.success) throw result;
    return result.output;
};
