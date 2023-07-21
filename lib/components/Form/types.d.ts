import ComponentProps from '../Component';
export interface InputProps extends ComponentProps {
    name: string;
    label?: string;
    placeholder?: string;
    inline?: boolean;
    disabled?: boolean;
    labelSeparator?: string;
    required?: boolean;
    value?: string | number;
    onChange?: (arg?: any) => void;
    validator?: (arg?: string | number) => boolean | string;
}
export declare type InputRefType = {
    isInputRefType: boolean;
    current: HTMLInputElement | HTMLTextAreaElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
};
