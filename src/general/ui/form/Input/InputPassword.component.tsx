import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { IconEyeClosed, IconEyeOpened } from '@/general/ui/icons';

import { Input, InputProps } from './Input.component';
import './Input.styles.css';

type Props = InputProps & { name: string };
type Component = (props: Props) => JSX.Element;

export const InputPassword: Component = memo(props => {
    const {
        id,
        labelText,
        errorMessage,
        prefixIcon,
        postfixIcon,
        className,
        ...inputProps
    } = props;
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState<boolean>(false);

    const type = useMemo(() => show ? 'text' : 'password', [show]);

    const handleToggle = useCallback(() => {
        setShow(state => !state);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [setShow]);

    const wrapperProps = { id, labelText, errorMessage, prefixIcon, postfixIcon, className };

    return (
        <Input 
            {...wrapperProps}
            onPostfixClick={handleToggle}
            postfixIcon={show ? <IconEyeOpened /> : <IconEyeClosed />}
        >
            <input
                {...inputProps}
                ref={inputRef}
                type={type}
                id={id}
                autoComplete='off'
            />
        </Input>
    )
}) as Component;
