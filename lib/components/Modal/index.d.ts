/// <reference types="react" />
import './index.scss';
import { ActionBarItemConfig } from 'components/ActionBar';
export interface ModalProps {
    areaId?: string;
    title?: string;
    children?: React.ReactNode;
    visible?: boolean;
    closeModal?: () => void;
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
