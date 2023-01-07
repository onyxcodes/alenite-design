export interface AccentConfig {
    accent?: string;
    accentLight?: string;
    accentDark?: string;
}
declare const setAccentStyle: (style: {
    [key: string]: any;
}, conf: AccentConfig) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
declare const accentStyle: (conf: AccentConfig) => {
    [key: string]: any;
};
export { accentStyle, setAccentStyle };
