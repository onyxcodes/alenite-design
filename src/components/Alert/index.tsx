import React from 'react';
import './index.scss';
import Button from 'components/Button';
import ComponentProps from 'components/Component';
import { accentStyle } from 'utils/colors';

interface AlertBaseProps extends ComponentProps {
    onClose?: () => void;
    cover?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    showClose?: boolean;
    rounded?: boolean;
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
        rounded = true,
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
    if (rounded) alertClass = `${alertClass} rounded`;

    let style: {[key: string]: any} = {};
    style = Object.assign(style, accentStyle({accent, accentLight, accentDark}));

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
    const content = children ? children : <>
        <div className='message'>
            {message}
        </div>
        { action && <div className='action'>{action}</div> }
    </>

    return (mounted ? <>
        <div
            className={alertClass}
            style={style}
        >
            {showClose && <Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle' type='text'
            />}
            <div className='alert-wrapper'>
                {cover && <div className='alert-cover'>
                    {cover}
                </div>}
                <div className='alert-content'>
                    {content}
                </div>
            </div>
        </div>
    </> : <></>);
}

export default Alert;