import { useCallback } from 'react';
import { Input, InputProps } from './Input.component';

type InputPriceProps = InputProps & {
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputPriceComponent = (props: InputPriceProps) => JSX.Element;

type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

export const InputPrice: InputPriceComponent = props => {
    const {
        id,
        labelText,
        errorMessage,
        prefixIcon,
        postfixIcon,
        className,
        onChange,
        ...inputProps
    } = props;

    const handleChange: HandleChange = useCallback(event => {
        const [integers, decimals] = event.target.value.split('.');
        if (decimals && decimals.length > 2) return;
        if (decimals && !integers) event.target.value = '0' + event.target.value;
        onChange(event);
    }, [onChange]);

    const wrapperProps = { id, labelText, errorMessage, prefixIcon, postfixIcon, className };
    
    return (
        <Input {...wrapperProps}>
            <input
                id={id}
                {...inputProps}
                type='number'
                step='0.01'
                autoComplete='off'
                onChange={handleChange}
            />
        </Input>
    )
};