import React from 'react';
import './index.scss';
export interface AlertProps {
    onClose?: () => void;
    children?: React.ReactNode;
    icon?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    className?: string;
    showClose?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
