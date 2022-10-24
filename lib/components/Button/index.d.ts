import React from 'react';
import './index.scss';
interface ButtonProps {
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    children?: string;
    type?: 'default' | 'primary' | 'text';
    shape?: 'default' | 'circle';
    className?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
