import React from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';

interface BaseButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
}

interface TextButtonProps extends BaseButtonProps {
    shape?: 'circle';
    type?: 'text';
    children: string;
}

interface IconButtonProps extends BaseButtonProps {
    iconName: string;
    type?: 'default' | 'primary';
    shape?: 'default-shape' | 'circle';
    children?: never;
}

export type ButtonProps = TextButtonProps | IconButtonProps;

const Button: React.FC<ButtonProps> = ( props ) => {
    const {
        name,
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        className,
        accent, accentDark, accentLight,
    } = props;

    let btnClass = `alenite-btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else btnClass = `${btnClass} anim-pulse`;

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});
    
    return <div
        role='button'
        data-testid={name ? `button-${name}` : undefined}
        style={style}
        title={title} onClick={onClick} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { children }
    </div>
}

export default Button;
