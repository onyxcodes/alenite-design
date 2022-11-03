/// <reference types="react" />
import './index.scss';
export interface ActionBarItemConfig {
    item: JSX.Element;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}
export interface ActionBarProps {
    position: string;
    items: (ActionBarItemConfig | null)[];
    type?: 'default' | 'primary' | 'secondary';
    className?: string;
}
declare const ActionBar: React.FC<ActionBarProps>;
export default ActionBar;
