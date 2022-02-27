/** @author AdmiJW */



import { CURSOR_STYLE, BLINK_MODE, DEFAULTS } from "./CONSTANT";
import { manipulateHTMLClassID } from '../utils';
import { IStylingOptions, ITextCursor_Styling, ITextTyperEventQueue_Styling, ITextTyper_Styling } from './types';
import { ITextCursor, ITextTyper } from '../types';

import "./styles/styles.css";


function __TextCursorInjector__(targetClass: typeof window.TextCursor) {
    return class extends targetClass implements ITextCursor_Styling {
        cursorStyle: CURSOR_STYLE = DEFAULTS.cursorStyle;
        blinkMode: BLINK_MODE = DEFAULTS.blinkMode;

        // Somehow, it requires constructor to work properly. I don't know why
        constructor(blinkDuration: number) {
            super(blinkDuration);
        }

        setCursorCss(properties: { [key: string]: string }): this {
            if (!properties) throw "Argument for setCursorCss() is undefined!";

            Object.keys(properties).forEach((key: string) => {
                this.html.style.setProperty(key, properties[key]);
            });
            return this;
        }

        configureStyling({
            blinkMode,
            cursorStyle
        }: IStylingOptions): this {
            if (blinkMode) {
                if (!(Object.values(BLINK_MODE).some((v)=> v === blinkMode)) ) 
                    throw `Invalid blinkMode argument in configureStyling(): ${blinkMode}`;

                this.blinkMode = blinkMode;
                this.html.style.animationName = blinkMode;
            }

            if (cursorStyle) {
                if (!(Object.values(CURSOR_STYLE).some((v)=> v === cursorStyle) ) )
                    throw `Invalid cursorStyle argument in configureStyling(): ${cursorStyle}`;

                this.cursorStyle = cursorStyle;
                manipulateHTMLClassID( this.html, { classNames: [cursorStyle], clearClassNames: true });
            }

            return this;
        }
    }
}


function __TextTyperInjector__(targetClass: typeof window.TextTyper) {
    return class extends targetClass implements ITextTyper_Styling {
        async configureStyling(config: IStylingOptions, resolve?: (value: unknown) => void): Promise<void> {
            (this.textCursor as ITextCursor & ITextCursor_Styling).configureStyling(config);

            if (resolve) resolve(undefined);
        }

        async setCursorCss(properties: { [key: string]: string; }, resolve?: (value: unknown) => void): Promise<void> {
            (this.textCursor as ITextCursor & ITextCursor_Styling).setCursorCss(properties);
            if (resolve) resolve(undefined);
        }

        async setTextboxCss(properties: { [key: string]: string; }, resolve?: (value: unknown) => void): Promise<void> {
            if (!properties) throw "Argument for setTextboxCss() is undefined!";

            Object.keys(properties).forEach((key: string) => {
                this.textbox.style.setProperty(key, properties[key]);
            });
            if (resolve) resolve(undefined);
        }
    }
}


function __TextTyperEventQueueInjector__(targetClass: typeof window.TextTyperEventQueue) {
    return class extends targetClass implements ITextTyperEventQueue_Styling {
        configureStyling(config: IStylingOptions): this {
            this.eventQueue.push({
                thisBinding: this.textTyper,
                eventFunc: (this.textTyper as ITextTyper & ITextTyper_Styling).configureStyling,
                args: [config]
            });
            return this;
        }

        setCursorCss(properties: { [key: string]: string; }): this {
            this.eventQueue.push({
                thisBinding: this.textTyper,
                eventFunc: (this.textTyper as ITextTyper & ITextTyper_Styling).setCursorCss,
                args: [properties]
            });
            return this;
        }

        setTextboxCss(properties: { [key: string]: string; }): this {
            this.eventQueue.push({
                thisBinding: this.textTyper,
                eventFunc: (this.textTyper as ITextTyper & ITextTyper_Styling).setTextboxCss,
                args: [properties]
            });
            return this;
        }
    }
}




window.TextCursor = __TextCursorInjector__(window.TextCursor);
window.TextTyper = __TextTyperInjector__(window.TextTyper);
window.TextTyperEventQueue = __TextTyperEventQueueInjector__(window.TextTyperEventQueue);


export {
    CURSOR_STYLE,
    BLINK_MODE
};