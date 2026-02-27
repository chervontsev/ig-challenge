// import { InputPassword, InputText, Button, Separator, Checkbox } from '@/general/ui';
// import { IconLock, IconMail } from '@/general/ui/icons';

// import { loginStoreHandlers, useLoginStore } from './LoginForm.store';
// import { loginController } from './LoginForm.controller';
import './LoginForm.styles.css';
import { useEffect, useState } from 'react';

// type HandleLoginClear = () => void;
// type HandleRememberChange = () => void;
// type HandleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
// type HandleFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => void;
// type HandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => void;

export const LoginForm = () => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // const { formData, formErrors, serverError } = useLoginStore();

    // const handleLoginClear: HandleLoginClear = () => {
    //     loginStoreHandlers.setField('username', '');
    // };

    // const handleRememberChange: HandleRememberChange = () => {
    //     loginStoreHandlers.toggleRemember();
    // };

    // const handleFieldChange: HandleFieldChange = event => {
    //     const { name, value } = event.target;
    //     loginStoreHandlers.setField(name, value);
    // };

    // const handleFieldFocus: HandleFieldFocus = event => {
    //     const { name } = event.target;
    //     loginStoreHandlers.setFieldError(name, null);
    // };

    // const handleFormSubmit: HandleFormSubmit = event => {
    //     event.preventDefault();
    //     loginController.submitForm();
    // };

    return (
        <div className='login-form'>
            {/* Test */}
            <div>{count}</div>

            {/* <div className='content'>
                <div className='logo'>
                    <div className='logo-inner'>
                        <img src='/src/app/assets/images/logo.svg' width={34} height={34} />
                    </div>
                </div>

                <hgroup>
                    <h1>Добро пожаловать!</h1>
                    <h4>Пожалуйста, авторизируйтесь</h4>
                </hgroup>

                <form onSubmit={handleFormSubmit}>
                    <InputText
                        className='login-form-input'
                        id='login-username'
                        name='username'
                        labelText='Почта'
                        errorMessage={formErrors.username}
                        value={formData.username}
                        prefixIcon={<IconMail />}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                        onClear={handleLoginClear}
                    />

                    <InputPassword
                        className='login-form-input'
                        id='login-password'
                        name='password'
                        labelText='Пароль'
                        errorMessage={formErrors.password}
                        value={formData.password}
                        prefixIcon={<IconLock />}
                        onChange={handleFieldChange}
                        onFocus={handleFieldFocus}
                    />

                    <div className='remember'>
                        <Checkbox
                            id='login-remember'
                            name='remember'
                            labelText='Запомнить данные'
                            checked={formData.remember}
                            onChange={handleRememberChange}
                        />
                    </div>

                    {serverError && (
                        <div className='auth-form-status'>
                            {serverError}
                        </div>
                    )}

                    <Button 
                        variant='primary' 
                        size='large'
                        text='Войти'
                        type='submit'
                    />

                    <Separator text='или' />
                </form>

                <div className='auth-footer'>
                    Нет аккаунта? <a>Создать</a>
                </div>
            </div> */}
        </div>
    );
};
