export type UserInput = {
    username: string;
    password: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
};

export type TokenData = {
    refreshToken: string;
    expiresInMins?: number;
};

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type ProductParams = {
    q?: string;
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: string;
};
