/** @author AdmiJW */


import { DEFAULTS } from './CONSTANT';
import { ITextCursor } from '../interfaces';

// Default style applied to the cursor.
import "./styles/style.css";




class TextCursor extends HTMLSpanElement implements ITextCursor {
    blinkDuration: number = DEFAULTS.DEFAULT_BLINK_PERIOD;
    isBlinking: boolean = true;

    /**
     * @param blinkDuration The duration in which one cursor blink cycle occurs, in milliseconds
     */
    constructor(blinkDuration: number = DEFAULTS.DEFAULT_BLINK_PERIOD) 
    {
        super();
        // Set the 'is' attribute as specified in https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
        this.setAttribute('is', DEFAULTS.HTML_DOMSTRING_NAME);

        // Permanent CSS styles that have to be applied
        this.style.animationIterationCount = 'infinite';
        this.style.animationTimingFunction = 'linear';
        
        this.setBlinkingDuration(blinkDuration);
    }


    setBlinkingDuration(duration: number): TextCursor {
        if ( !isFinite(duration) || duration < 0 ) 
            throw `Invalid blink duration provided in the constructor of Cursor: ${duration}`;
        
        this.blinkDuration = duration;
        this.style.animationDuration = `${duration}ms`;
        return this;
    }

    
    setIsBlinking(turnOn: boolean): TextCursor {
        // Only changes the CSS value if required.
        if (!this.isBlinking && turnOn) this.style.animationDuration = `${this.blinkDuration}ms`;
        else if (this.isBlinking && !turnOn) this.style.animationDuration = '0ms';

        this.isBlinking = turnOn;
        return this;
    }
}

// Registers a new custom HTML element - <text-cursor>. See https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
customElements.define('text-cursor', TextCursor, { extends: 'span'});


export default TextCursor;