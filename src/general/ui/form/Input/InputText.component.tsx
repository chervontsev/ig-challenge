import { useCallback, useRef } from 'react';
import { Input, InputProps } from './Input.component';

type InputTextProps = InputProps & { name: string };
type InputTextComponent = (props: InputTextProps) => JSX.Element;

export const InputText: InputTextComponent = props => {
    const { 
        id, 
        labelText, 
        errorMessage, 
        prefixIcon, 
        postfixIcon, 
        className,
        onClear, 
        ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = useCallback(() => {
        if (onClear && inputRef.current) {
            inputRef.current.focus();
            onClear();
        }
    }, [onClear]);

    const wrapperProps = { 
        id, 
        labelText, 
        errorMessage, 
        prefixIcon, 
        postfixIcon, 
        className,
        onClear: !onClear ? undefined : handleClear
    };

    return (
        <Input {...wrapperProps}>
            <input
                {...inputProps}
                ref={inputRef}
                id={id}
                type='text'
                autoComplete='off'
            />
        </Input>
    )
};
