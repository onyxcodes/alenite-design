import React from 'react';
import './index.scss';
declare type BaseButton = {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    className?: string;
};
interface TextButton extends BaseButton {
    shape?: never;
    children: string;
}
interface IconButton extends BaseButton {
    iconName: string;
    shape?: 'default' | 'circle';
    children?: never;
}
export declare type ButtonProps = TextButton | IconButton;
declare const Button: React.FC<ButtonProps>;
export default Button;
