import React from 'react';
import useModal from 'hooks/useModal';
import Button from 'components/Button';

interface ActionBarAltItem {
    item: JSX.Element;
    title?: string;
    alt?: JSX.Element;
}

/** 
 * @description By default, the alternative item for actionbar item is a button with icon as '...',
 * when clicked, it show's a modal with the original item as content.
 * If provided, uses a specific element as 'trigger'
 */
const ActionBarAltItem: React.FC<ActionBarAltItem> = ( props ) => {
    const { item, title, alt } = props;

    const { Modal, open: openModal } = useModal();

    const trigger = alt ? <alt.type 
        {...alt.props}
        // TODO: Consider the use case in which the alternative element already has an onClick,
        // should it be fired too?
        onClick={openModal} 
    /> : <Button title={title} shape='circle' iconName='ellipsis-h' onClick={openModal}/>

    return <>
        { trigger }
        { <Modal title={title}>{item}</Modal> }
    </>
}


export default ActionBarAltItem;