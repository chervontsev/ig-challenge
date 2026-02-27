import { InputHTMLAttributes, memo } from 'react';

import './Checkbox.styles.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    id?: string;
    name?: string;
    labelText?: string;
};

type Component = (props: Props) => JSX.Element;

export const Checkbox: Component = memo(props => {
    const { id, name, labelText, checked, ...inputProps } = props;

    return (
        <label className='checkbox-field' htmlFor={id}>
            <div className='checkbox'>
                <input
                    {...inputProps}
                    type='checkbox'
                    id={id}
                    name={name}
                    checked={checked}
                />
            </div>
            
            {labelText && (
                <span className='labelText'>
                    {labelText}
                </span>
            )}
        </label>
    )
}) as Component;
