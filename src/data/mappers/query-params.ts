
type GetQueryParams = <Type>(params: Record<string, Type>) => string;

export const getQueryParams: GetQueryParams = params => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });
    return searchParams.toString();
};
