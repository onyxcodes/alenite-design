import React from 'react';
import ComponentProps from '../../Component';
import './index.scss';
export declare type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
export interface SelectProps extends ComponentProps {
    options: SelectOption[];
    name: string;
    label?: string;
    onChange?: (arg: SelectOption) => void;
}
declare const Select: React.FC<SelectProps>;
export default Select;
