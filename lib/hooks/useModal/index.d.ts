import { ModalProps } from 'components/Modal';
/**
 * Custom hook meant to export a Modal component and the methods to manage its state
 * This allows to provide the Modal component with headers, footers or content that can already alter that state
 * Also to ease the management of the state from other components outside the Modal.
 */
declare const useModal: () => {
    Modal: (props: ModalProps) => JSX.Element;
    state: boolean;
    open: () => void;
    close: () => void;
};
export default useModal;
