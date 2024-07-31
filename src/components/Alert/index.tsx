import React from 'react';
import './index.scss';
import Button from 'components/Button';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';

interface AlertBaseProps extends ComponentProps {
    onClose?: () => void;
    cover?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    showClose?: boolean;
    cornerRadius?: false | 's' | 'm' | 'l';
    transition?: boolean;
}

interface AlertCustomProps extends AlertBaseProps {
    children?: React.ReactNode;
    message?: never;
    action?: never;
}

interface AlertSimpleProps extends AlertBaseProps {
    children?: never;
    message: string;
    action?: JSX.Element[];
}

export type AlertProps = AlertSimpleProps | AlertCustomProps;

const Alert: React.FC<AlertProps> = (props) => {
    const {
        cover,
        visible = true,
        closeAlert,
        showClose = true,
        cornerRadius = false,
        transition,
        onClose,
        children,
        message,
        action,
        className,
        accent, accentDark, accentLight
    } = props;

    const [mounted, mount] = React.useState(false);
    const [visibility, setVisibility] = React.useState(false);

    let alertClass = 'alenite-alert';
    if (cornerRadius) alertClass = `${alertClass} corner-radius-${cornerRadius}`;

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});

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

    // Display the content as provided children or format message and action
    const content = children ? 
        <>
            {children}
            {showClose && <div className='action'><Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle'
            /></div>}
        </> : <>
        <div className='message'>
            {message}
        </div>
        { (action || showClose) ? <div className='action'>
            {action}
            {showClose && <Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle' type='text'
            />}
        </div> : null }
    </>

    return (mounted ? <>
        <div
            className={alertClass}
            style={style}
        >
            <div className='alert-wrapper'>
                {cover && <div className='alert-cover'>
                    {cover}
                </div>}
                <div className='alert-content'>
                    {content}
                </div>
            </div>
        </div>
    </> : null);
}

export default Alert;