import React from 'react';
import ComponentProps from '../Component';
import './index.scss';
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
    children?: string;
}
interface IconButtonProps extends BaseButtonProps {
    iconName: string;
    type?: 'default' | 'primary';
    shape?: 'default-shape' | 'circle';
    children?: never;
}
export type ButtonProps = TextButtonProps | IconButtonProps;
declare const Button: React.FC<ButtonProps>;
export default Button;
