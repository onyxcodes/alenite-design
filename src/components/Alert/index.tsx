import React from 'react';
import './index.scss';
import Button from 'components/Button';

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
const Alert: React.FC<AlertProps> = (props) => {
    const {
        cover,
        visible = true,
        children,
        closeAlert,
        showClose = true,
        rounded = true,
        onClose,
        className
    } = props;

    const [mounted, mount] = React.useState(false);
    const [visibility, setVisibility] = React.useState(false);

    let alertClass = 'alenite-alert';
    if (rounded) alertClass = `${alertClass} rounded`;
    if (className) alertClass = `${alertClass} ${className}`;

    React.useLayoutEffect(() => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if (visible) {
            mount(visible);
            visiblityTimeoutId = window.setTimeout(() => setVisibility(true), 150)
        } else {
            unmountTimeoutId = window.setTimeout(() => mount(visible), 1000);
            setVisibility(visible);
        }

        return () => {
            if (unmountTimeoutId) window.clearTimeout(unmountTimeoutId);
            if (visiblityTimeoutId) window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);

    if (visibility) {
        alertClass = `${alertClass} visible`;
    }

    /* Trace unmount of component to trigger, if provided,
     * fire onClose callback
     */
    React.useEffect(() => {
        if (!mounted && !visible) {
            onClose && onClose();
        }
    }, [mounted]);

    return (mounted ? <>
        <div className={alertClass}>
            {showClose && <Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle' type='text'
            />}
            <div className='alert-wrapper'>
                {cover && <div className='alert-cover'>
                    {cover}
                </div>}
                <div className='alert-content'>
                    {children}
                </div>
            </div>
        </div>
    </> : <></>);
}

export default Alert;