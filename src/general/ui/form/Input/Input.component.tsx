import { InputHTMLAttributes, memo, PropsWithChildren, useCallback } from 'react';
import classNames from 'classnames';

import { IconX } from '@/general/ui/icons';

import './Input.styles.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & PropsWithChildren & {
    labelText?: string;
    id: string;
    errorMessage?: string | null;
    prefixIcon?: JSX.Element;
    postfixIcon?: JSX.Element;
    onClear?: () => void;
    onPostfixClick?: () => void;
};

type Component = (props: InputProps) => JSX.Element;

export const Input: Component = memo(props => {
    const { 
        id, 
        labelText, 
        errorMessage, 
        prefixIcon, 
        postfixIcon, 
        className, 
        onClear, 
        onPostfixClick,
        children
    } = props;

    const handlePostfixClick = useCallback(() => {
        if (onPostfixClick) onPostfixClick();
    }, [onPostfixClick])

    return (
        <div className={classNames('input-field', className)}>
            {labelText && (
                <label htmlFor={id}>
                    {labelText}
                </label>
            )}

            <div className='input'>
                {prefixIcon && (
                    <div className='icon'>
                        {prefixIcon}
                    </div>
                )}

                {children}

                {onClear && (
                    <div className='icon toggle' onClick={onClear}>
                        <IconX />
                    </div>
                )}

                {postfixIcon && (
                    <div className='icon toggle' onClick={handlePostfixClick}>
                        {postfixIcon}
                    </div>
                )}
            </div>

            {errorMessage && (
                <div className='error'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}) as Component;
