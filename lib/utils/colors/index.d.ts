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
/** From https://stackoverflow.com/a/50282399
 * Takes a 3 or 6-digit hex color code, and an optional 0-255 numeric alpha value
*/
export declare const hex2rgba: (hex: string, alpha: number) => string | undefined;
export { accentStyle, setAccentStyle };
