import './index.scss';

import ActionBarSection from './ActionBarSection';

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
    type?: 'default' | 'primary';
    className?: string;
};

const ActionBar: React.FC<ActionBarProps> = ( props ) => {
    const { 
        position ='top',
        items,
        type = 'default',
        className
    } = props;
    let actionBarClass = `actionbar-container ${type} ${position} py05`;

    if (className) actionBarClass = `${actionBarClass} ${className}`;

    return (
        <div 
            className={actionBarClass}
        >
            <ActionBarSection type='left' items={items} />
            <ActionBarSection type='center' items={items} />
            <ActionBarSection type='right' items={items} />
        </div>
    )
}

export default ActionBar;