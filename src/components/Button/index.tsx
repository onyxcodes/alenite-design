import React from 'react';
import Icon from 'components/Icon';
import './index.scss';

type BaseButton = {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    className?: string
}

interface TextButton extends BaseButton {
    shape: never;
    children: string;
}

interface IconButton extends BaseButton {
    iconName: string;
    shape?: 'default' | 'circle';
    children: never;
}

export type ButtonProps = TextButton | IconButton;

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
        className
    } = props;

    let btnClass = `alenite-btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else btnClass = `${btnClass} anim-pulse`;
    
    return <div
        role='button'
        data-testid={name ? `button-${name}` : undefined}
        title={title} onClick={onClick} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { children }
    </div>
}

export default Button;
