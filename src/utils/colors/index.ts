import { lighten, darken } from 'color2k';
export interface AccentConfig {
    accent?: string;
    accentLight?: string;
    accentDark?: string;
}
const accentStyle = (conf: AccentConfig) => {
    const { accent, accentLight, accentDark } = conf;
    let style: {[key: string]: any} = {};

    if (accent) {
        style['--color-primary'] = accent;
        style['--color-primary-light'] = lighten(accent, 0.15);
        style['--color-primary-dark'] = darken(accent, 0.15)
    }

    if (accentLight) {
        style['--color-primary-light'] = accentLight
    }

    if (accentDark) {
        style['--color-primary-dark'] = accentDark;
    }

    return style;
}

export {accentStyle};