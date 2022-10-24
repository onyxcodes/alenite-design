import React, { MutableRefObject } from 'react';
import './index.scss';
export interface ActionBarItemProps {
    item: JSX.Element;
    title?: string;
    siblingWeight?: number;
    scale?: boolean;
    scaleFactor?: number;
    alt?: JSX.Element;
    uniqueKey: string | number;
    sectionRef?: MutableRefObject<HTMLDivElement | null>;
    setReady?: (arg: any) => void;
}
export declare type ActionBarItemRef = {
    element: HTMLDivElement | null;
    key: string | number;
};
declare const ActionBarItem: React.FC<ActionBarItemProps>;
export default ActionBarItem;
