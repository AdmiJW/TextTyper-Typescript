/** @author AdmiJW */


import { BLINK_MODE, CURSOR_STYLE } from './CONSTANT';


export interface IStylingOptions {
    blinkMode?: BLINK_MODE;
    cursorStyle?: CURSOR_STYLE;
}


export interface ITextCursor_Styling {
    blinkMode: BLINK_MODE;
    cursorStyle: CURSOR_STYLE;

    configureStyling(config: IStylingOptions): this;
    setCursorCss(properties: { [key: string]: string }): this;
}


export interface ITextTyper_Styling {
    configureStyling(config: IStylingOptions, resolve?: (value:unknown)=>void ): Promise<void>;
    setCursorCss(properties: { [key: string]: string }, resolve?: (value: unknown)=>void ): Promise<void>;
    setTextboxCss(properties: { [key: string]: string }, resolve?: (value: unknown)=>void ): Promise<void>;
}


export interface ITextTyperEventQueue_Styling {
    configureStyling(config: IStylingOptions): this;
    setCursorCss(properties: { [key: string]:string }): this;
    setTextboxCss(properties: { [key: string]: string }): this;
}