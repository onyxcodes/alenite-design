import './index.scss';

import ActionBar, { ActionBarItemConfig } from "components/ActionBar";
// import Loader from "components/Loader";
import Button from 'components/Button';
import ReactDOM from 'react-dom';

export interface ModalProps {
    title?: string;
    // TODO: Uniform everywhere where the element expects children the same way Reac treats its children
    children?: React.ReactNode;
    visible?: boolean;
    // loading?: boolean;
    closeModal?: () => void;
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
};

const Modal: React.FC<ModalProps> = ( props ) => {
    const {
        title,
        children,
        visible = false,
        // loading = false,
        topActionBarItems, btmActionBarItems,
        closeModal
    } = props;

    let modalClass = 'modal';

    if (visible) modalClass = `${modalClass} visible`;

    let modalFgClass = 'modal-fg r05';
    let modalBgClass = 'modal-bg'; // Mask

    const modalArea = document.getElementById('modal-area');

    return (modalArea && visible) ? ReactDOM.createPortal(<div className={modalClass}>
        <div className={modalBgClass} onClick={closeModal}>

        </div>
        <div className={modalFgClass}>
            <ActionBar position="top"
                items={[
                    // TODO: change definition (also accept function) at a lower level (ActionBarProps)
                    title ? { item: <span>{title}</span>, position: "center", key: 'modal-title', scale: false } : null,
                    ...(topActionBarItems instanceof Function && topActionBarItems() || topActionBarItems instanceof Array && topActionBarItems || []),
                    { 
                        item: <Button shape='circle' type='primary' onClick={closeModal} iconName='close' />,
                        position: "right",
                        title: 'Close',
                        key: 'close-modal'
                    }
                ]}
            />
            {/* <Loader show={loading} /> */}
            { <div className="modal-content p1">
                {children}
            </div> }
            {btmActionBarItems && <ActionBar position="bottom"
                items={[
                    ...(btmActionBarItems instanceof Function && btmActionBarItems() || btmActionBarItems instanceof Array && btmActionBarItems || [])
                ]}
            />}
        </div>
    </div>, modalArea
    ) : null;
}

export default Modal;