import { regex } from '@/general/utils/regex';

import { LoginFormData, LoginFormErrors } from '../features/LoginForm/LoginForm.store';

type AuthValidators = {
    validateUsername: (value: string) => string | null;
    validatePassword: (value: string) => string | null;
};

export const authValidators: AuthValidators = {
    validateUsername: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        if (!regex.onlyLatinLetters.test(value)) {
            return 'Только латинские буквы';
        }
        return null;
    },
    validatePassword: value => {
        if (value.trim().length === 0) {
            return 'Не может быть пустым';
        }
        return null;
    },
};

type LoginFormValidated = {
    hasErrors: boolean;
    errors: LoginFormErrors;
    data: LoginFormData;
};

type ValidationService = {
    validateLoginData: (formData: LoginFormData) => LoginFormValidated;
};

export const validationService: ValidationService = {
    validateLoginData: data => {
        const errors = {
            username: authValidators.validateUsername(data.username),
            password: authValidators.validatePassword(data.password),
        }
        const hasErrors = Object.values(errors).some(v => v !== null);
        return { hasErrors, errors, data };
    },
};
