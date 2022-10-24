import React from 'react';
import Icon from 'components/Icon';
import './index.scss';

interface ButtonProps {
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    children?: string;
    type?: 'default' | 'primary' | 'text';
    shape?: 'default' | 'circle';
    className?: string
}
// TODO: Add as property to enable specifying which html tag will be used for dom
const Button: React.FC<ButtonProps> = ( props ) => {
    const { 
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        className
    } = props;

    let btnClass = `btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else btnClass = `${btnClass} anim-pulse`;
    
    return(
        <div title={title} onClick={onClick} className={btnClass}>
            { iconName && <Icon name={iconName}/>}
            { children }
        </div>
    )
}

export default Button;
