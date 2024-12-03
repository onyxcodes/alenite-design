import React from "react";
import './index.scss';
import {hex2rgba} from '../../utils/colors';
import ComponentProps from '../Component';
import ActionBar, { ActionBarItemConfig } from "../ActionBar";
import Button from "../Button";
import { setAccentStyle } from 'utils/colors';

interface CardSizeConfig {
    size: [number, number];
    size_l: [number, number];
    size_m: [number, number];
    size_s: [number, number];
}

const setCardSizing = (style: {[key: string]: any}, conf: CardSizeConfig ) => {
    return Object.assign(style, cardSizing(conf));
}

const cardSizing = ( conf: CardSizeConfig ) => {
    const { size, size_l, size_m, size_s } = conf;
    let style: {[key: string]: any} = {
        "--card-size-s": `span ${size_s[1]} / span ${size_s[0]}`,
        "--card-size-m": `span ${size_m[1]} / span ${size_m[0]}`,
        "--card-size-l": `span ${size_l[1]} / span ${size_l[0]}`,
        "--card-size": `span ${size[1]} / span ${size[0]}`
    }
    return style;
}

export interface CardProps extends ComponentProps {
    title?: string;
    children?: React.ReactNode;
    // TODO: set accepted sizes, and style accordingly
    size?: [number, number];
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    size_s?: [number, number];
    size_m?: [number, number];
    size_l?: [number, number];
    className?: string;
    onClick?: () => void;
    onClose?: () => void;
    transition?: boolean; // of comp visibility
    visible?: boolean;
    showClose?: boolean;
    bgColor?: string;
    cover?: string;
    cornerRadius?: 's' | 'm' | 'l' | false;
    padding?: 's' | 'm' | 'l';
    headingBgAlfa?: number;
    headingBgColor?: string;
    headingTextAlign?: 'start' | 'center' | 'end';
}
const Card: React.FC<CardProps> = ( props ) => {
    const {
        title, size = [3,2], size_l = size, size_m = size_l, size_s = size_m,
        onClick, onClose, topActionBarItems,
        accent, accentDark, accentLight,
        bgColor = "#999999", cover,
        className, children, headingBgAlfa = 1,
        cornerRadius = 's', padding = 's',
        headingBgColor = accent || "#ffffff",
        headingTextAlign = 'start',
        transition = false,
        visible = true, showClose = false,
    } = props;

    let cardClass = `alenite-card padding-${padding}`;
    if (className) cardClass = `${cardClass} ${className}`;
    let coverAnim = !cover;
    
    if (cornerRadius) cardClass = `${cardClass} corner-${cornerRadius}`;
    if (coverAnim) cardClass = `${cardClass} cover-anim`;

    const [mounted, mount] = React.useState(!transition);
    const [visibility, setVisibility] = React.useState(false);

    React.useLayoutEffect(() => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if (visible && transition) {
            mount(visible);
            visiblityTimeoutId = window.setTimeout(() => setVisibility(true), 150)
        } else if (transition) {
            unmountTimeoutId = window.setTimeout(() => mount(visible), 1000);
            setVisibility(visible);
        }

        return () => {
            if (unmountTimeoutId) window.clearTimeout(unmountTimeoutId);
            if (visiblityTimeoutId) window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);

    if (visibility) {
        cardClass = `${cardClass} visible`;
    }

    let style: {[key: string]: any} = cardSizing({size, size_l, size_m, size_s});

    style = setAccentStyle(style, {accent, accentLight, accentDark});

    let headingStyle = {
        background: hex2rgba(headingBgColor, headingBgAlfa),
        textAlign: headingTextAlign
    }

    /* Trace unmount of component to trigger, if provided,
     * fire onClose callback
     */
    React.useEffect(() => {
        if (!mounted && !visible) {
            onClose && onClose();
        }
    }, [mounted]);

    const header = React.useMemo(()=> {
        if (cover != null || title?.length) {
            return <div className="cover" style={{
                backgroundRepeat: cover ? 'no-repeat' : undefined,
                backgroundSize: cover ? 'contain' : undefined,
                backgroundPosition: cover ? 'center' : undefined,
                backgroundImage: cover ? "url("+cover+")" : undefined 
            }}>
                <div className='alenite-card-heading' style={headingStyle}><ActionBar position='top'
                items={[
                    title ? { item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false } : null,
                    ...(topActionBarItems instanceof Function && topActionBarItems() || topActionBarItems instanceof Array && topActionBarItems || []),
                    showClose ? {
                        item: <Button
                            shape='circle'
                            onClick={onClose} iconName='close'
                            accent={accent} accentDark={accentDark} accentLight={accentLight}
                        />,
                        position: 'right',
                        title: 'Close',
                        key: 'close-modal'
                    } : null
                ]}
            /></div>
            </div>
        }
    }, []);

    return mounted ? <div 
        className={cardClass}
        onClick={onClick}
        style={style}
    >
        {header}
        <div className="content">{children}</div>
    </div> : <></>
}

export default Card;
