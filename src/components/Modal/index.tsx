import './index.scss';

import ActionBar, { ActionBarItemConfig } from 'components/ActionBar';
import Button from 'components/Button';
import ReactDOM from 'react-dom';

export interface ModalProps {
    areaId?: string;
    title?: string;
    children?: React.ReactNode;
    visible?: boolean;
    closeModal?: () => void;
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
};

const Modal: React.FC<ModalProps> = (props) => {
    const {
        areaId,
        title,
        children,
        visible = false,
        topActionBarItems, btmActionBarItems,
        closeModal
    } = props;

    let modalClass = 'alenite-modal';

    if (visible) modalClass = `${modalClass} visible`;

    let modalFgClass = 'modal-fg r05'; // The modal
    let modalBgClass = 'modal-bg'; // Mask

    const modalArea = areaId ? document.getElementById(areaId) : undefined;

    const content = <div className={modalClass}>
        <div className={modalBgClass} onClick={closeModal}></div>
        <div className={modalFgClass}>
            <ActionBar position='top'
                items={[
                    title ? { item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false } : null,
                    ...(topActionBarItems instanceof Function && topActionBarItems() || topActionBarItems instanceof Array && topActionBarItems || []),
                    {
                        item: <Button shape='circle' type='text' onClick={closeModal} iconName='close' />,
                        position: 'right',
                        title: 'Close',
                        key: 'close-modal'
                    }
                ]}
            />
            {<div className='modal-content p1'>
                {children}
            </div>}
            {btmActionBarItems && <ActionBar position='bottom'
                items={[
                    ...(btmActionBarItems instanceof Function && btmActionBarItems() || btmActionBarItems instanceof Array && btmActionBarItems || [])
                ]}
            />}
        </div>
    </div>

    if (visible) {
        if (modalArea) return ReactDOM.createPortal(content, modalArea);
        else return content;
    } else return <></>;
}

export default Modal;