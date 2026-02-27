import { createStore, useStore } from 'zustand';

export type LoginFormData = {
    username: string;
    password: string;
    remember: boolean;
};

export type LoginFormErrors = {
    username: string | null;
    password: string | null;
};

type LoginState = {
    formData: LoginFormData;
    formErrors: LoginFormErrors;
    serverError: string | null;
};

const initialLoginState: LoginState = {
    formData: {
        username: '',
        password: '',
        remember: false,
    },
    formErrors: {
        username: null,
        password: null,
    },
    serverError: null,
};

export const loginStore = createStore<LoginState>()(() => ({ ...initialLoginState }));
export const useLoginStore = () => useStore(loginStore);

type LoginStoreHandlers = {
    setField: (key: string, value: string) => void;
    toggleRemember: () => void;
    setFieldError: (key: string, error: string | null) => void;
    setFieldErrors: (formErrors: LoginFormErrors) => void;
    setLoginError: (reason: string | null) => void;
    resetStore: () => void;
};

export const loginStoreHandlers: LoginStoreHandlers = {
    setField: (key, value) => {
        loginStore.setState(state => {
            const formData = { ...state.formData, [key]: value };
            return { formData };
        });
    },
    toggleRemember: () => {
        loginStore.setState(state => {
            const formData = { ...state.formData, remember: !state.formData.remember };
            return { formData };
        });
    },
    setFieldError: (key, error) => {
        loginStore.setState(state => {
            const formErrors = { ...state.formErrors, [key]: error };
            return { formErrors };
        });
    },
    setFieldErrors: formErrors => {
        loginStore.setState({ formErrors });
    },
    setLoginError: reason => {
        const { formErrors } = initialLoginState;
        loginStore.setState({ formErrors, serverError: reason });
    },
    resetStore: () => {
        loginStore.setState(initialLoginState);
    },
};
