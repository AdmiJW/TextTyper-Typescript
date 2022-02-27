export enum BLINK_MODE {
    NONE = 'BLINK_NONE',
    CONSTANT = 'BLINK_CONSTANT',
    LINEAR = 'BLINK_LINEAR'
}


export enum CURSOR_STYLE {
    VERTICAL = 'STYLE_VERT',
    I = 'STYLE_I',
    Y = 'STYLE_Y',
    _ = 'STYLE__',
    BLOCK = 'STYLE_BLOCK',
    LEFTARR = 'STYLE_LEFTARR',
    NONE = 'STYLE_NONE'
}



export const DEFAULTS = {
    blinkMode: BLINK_MODE.CONSTANT,
    cursorStyle: CURSOR_STYLE.VERTICAL,
};