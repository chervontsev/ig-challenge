import { appRouter } from '@/app/router';
import { appStoreHandlers } from '@/app/store';
import { authService } from '@/data/services/auth.service';

import { validationService } from '../../services/validation.service';

import { loginStore, loginStoreHandlers } from './LoginForm.store';

type AuthController = {
    submitForm: () => void;
};

export const loginController: AuthController = {
    submitForm: () => {
        const { formData } = loginStore.getState();
        const validated = validationService.validateLoginData(formData);

        if (validated.hasErrors) {
            return loginStoreHandlers.setFieldErrors(validated.errors);
        }
        authService.login(validated.data)
            .then(({ accessToken = null }) => {
                appStoreHandlers.setToken(accessToken);
                loginStoreHandlers.resetStore();
                appRouter.toProducts('');
            })
            .catch((error: string) => {
                loginStoreHandlers.setLoginError(error);
            });
    },
};
