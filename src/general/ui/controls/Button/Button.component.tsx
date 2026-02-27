import { ButtonHTMLAttributes, memo } from 'react';
import classNames from 'classnames';

import './Button.styles.css';

type Variant = 'primary' | 'light' | 'ghost';
type Size = 'small' | 'base' | 'large';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    isIcon?: boolean;
    text: string | JSX.Element;
    prefixEl?: JSX.Element;
    postfixEl?: JSX.Element;
};

type Component = (props: Props) => JSX.Element;

export const Button: Component = memo(props => {
    const { 
        variant = 'light', 
        size = 'base', 
        isIcon, 
        text, 
        prefixEl, 
        postfixEl, 
        className, 
        ...buttonProps
    } = props;

    return (
        <button {...buttonProps} className={classNames(
            'btn',
            `btn-${variant}`,
            `btn-${size}`,
            { 'btn-icon': isIcon },
            className
        )}>
            {prefixEl && prefixEl}
            {text}
            {postfixEl && postfixEl}
        </button>
    );
}) as Component;
