/** @author AdmiJW */


import { DEFAULTS } from './CONSTANT';
import { ITextCursor } from '../types';

// Default style applied to the cursor.
import "./styles/style.css";




class TextCursor implements ITextCursor {
    blinkDuration: number = DEFAULTS.DEFAULT_BLINK_PERIOD;
    isBlinking: boolean = true;
    html: HTMLElement;

    /**
     * @param blinkDuration The duration in which one cursor blink cycle occurs, in milliseconds
     */
    constructor(blinkDuration: number = DEFAULTS.DEFAULT_BLINK_PERIOD) 
    {
        this.html = document.createElement('span');
        this.html.setAttribute('data-is', DEFAULTS.HTML_IS_ATTRIBUTE);
        this.setBlinkingDuration(blinkDuration);
    }


    setBlinkingDuration(duration: number): this {
        if ( !isFinite(duration) || duration < 0 ) 
            throw `Invalid blink duration provided in the constructor of Cursor: ${duration}`;
        
        this.blinkDuration = duration;
        this.html.style.animationDuration = `${duration}ms`;
        return this;
    }

    
    setIsBlinking(turnOn: boolean): this {
        // Only changes the CSS value if required.
        if (!this.isBlinking && turnOn) this.html.style.animationDuration = `${this.blinkDuration}ms`;
        else if (this.isBlinking && !turnOn) this.html.style.animationDuration = '0ms';

        this.isBlinking = turnOn;
        return this;
    }

    
    getHTML(): HTMLElement {
        return this.html;
    }
}


export default TextCursor;