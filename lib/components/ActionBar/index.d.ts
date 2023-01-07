/// <reference types="react" />
import './index.scss';
import ComponentProps from '../Component';
export interface ActionBarItemConfig {
    item: JSX.Element;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}
export interface ActionBarProps extends ComponentProps {
    position: string;
    items: (ActionBarItemConfig | null)[];
    type?: 'default' | 'primary' | 'secondary';
}
declare const ActionBar: React.FC<ActionBarProps>;
export default ActionBar;
