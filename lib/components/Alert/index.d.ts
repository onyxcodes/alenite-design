import React from 'react';
import './index.scss';
export interface AlertProps {
    onClose?: () => void;
    children?: React.ReactNode;
    cover?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    className?: string;
    showClose?: boolean;
    rounded?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
