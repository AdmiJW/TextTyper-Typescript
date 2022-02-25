/** @author AdmiJW */


import { DEFAULTS } from './CONSTANT';
import TextCursor from './TextCursor';
import TextTyperEventQueue from './TextTyperEventQueue';
import { getTimeoutPromise } from '../utils';
import { ITextTyper, ITextTyperConfig } from '../interfaces';


class TextTyper implements ITextTyper {
    textbox: HTMLElement;
    typeMsPerCharacter: number = 1000/DEFAULTS.DEFAULT_TYPE_CPS;
    deleteMsPerCharacter: number = 1000/DEFAULTS.DEFAULT_DELETE_CPS;
    textCursor: TextCursor;
    textNode: Text;


    /**
     * @param textbox The `HTMLElement` designated to become the element where the cursor resides and text will be typed within 
     * @param typeCPS Character per second (CPS) for typing
     * @param deleteCPS Character per second (CPS) for deletion
     * @param blinkDuration The duration in which the cursor blinks.
     */
    constructor(
        textbox: HTMLElement,
        {
            typeCPS = DEFAULTS.DEFAULT_TYPE_CPS,
            deleteCPS = DEFAULTS.DEFAULT_DELETE_CPS,
            blinkDuration = DEFAULTS.DEFAULT_BLINK_PERIOD,
        }: ITextTyperConfig
    ) {
        if (!(textbox instanceof Element))
            throw "The textbox passed into the TextTyper constructor must be a valid HTML element!";
        
        this.textbox = textbox;
        this.configure({ typeCPS, deleteCPS });
        this.textCursor = new TextCursor(blinkDuration);
        this.textNode = document.createTextNode('');
        
        // Clears the textbox of any children before placing the text node and cursor
        while (this.textbox.firstChild) this.textbox.removeChild( this.textbox.firstChild );
        this.textbox.classList.add('text-box');
        this.textbox.appendChild( this.textNode );
        this.textbox.appendChild( this.textCursor );
    }


    /**
     * This is a method used to append the provided string into the textnode of textbox. Note that the newline
     * character works as expected (By appending `<br/>`)
     * This design allows for extensions to modify the behavior of typing
     * texts by applying decorator pattern.
     * 
     * @param char The single character to be typed into the textbox.
     */
    _type( char: string ) {
        if (char === '\n') this._newline();
        else this.textNode.textContent += char;
    }

    /**
     * This is a method used to delete characters from the end of the textnode in the textbox. If the current
     * textnode is already empty (empty line), then it will move back to previous textnode (line)
     * This design allows for extensions to modify the behavior of deleting text
     * by applying decorator pattern
     * 
     * @param n The number of characters to delete from the end
     */
    _delete( n: number ) {
        if (!this.textNode.textContent && this.textNode.previousSibling) {
            this.textbox.removeChild( this.textCursor.previousSibling! );   // Remove the current text node (empty)
            this.textbox.removeChild( this.textCursor.previousSibling! );   // Remove the <br/> element
            this.textNode = this.textCursor.previousSibling as Text;
        }
        else this.textNode.textContent = this.textNode.textContent!.slice(0, -n);
    }


    /**
     * Moves the cursor to a new line in the textnode.
     * This is done by appending a <br/> element and a new text node after the breakline
     */
    _newline() {
        this.textbox.insertBefore<HTMLBRElement>( document.createElement<"br">("br"), this.textCursor );
        this.textbox.insertBefore<Text>( document.createTextNode(''), this.textCursor );
        this.textNode = this.textCursor.previousSibling as Text;
    }


    /**
     * Types the provided string into the text box, character by character, following the
     * configured typeCPS (Character per second)
     * 
     * @param text The text to be typed into the textbox
     * @param resolve The Promise's resolve function to be executed after the process is done,
     *      used by `CursorEventQueue`
     */
    async type( text:string , resolve?: (value:unknown)=>void ) {
        this.textCursor.setIsBlinking(false);
        for (let c of text) {
            await getTimeoutPromise( ()=> {
                this._type(c);
            }, this.typeMsPerCharacter);
        }
        this.textCursor.setIsBlinking(true);

        if (resolve) resolve(undefined);
    }


    /**
     * Puts the text __immediately__ into the textbox without typing one by one
     * 
     * @param text The text to be appended immediately into the textbox
     * @param resolve The Promise's resolve function to be executed after the process is done,
     *      used by `CursorEventQueue`
     */
    async putText( text: string, resolve?: (value:unknown)=>void ) {
        this.textCursor.setIsBlinking(false);
        this._type(text);
        this.textCursor.setIsBlinking(true);

        if (resolve) resolve(undefined);
    }


    /**
     * Adds a delete event
     * 
     * Deletes the specified number of characters from the end of the text within the text node.
     * 
     * @param count Number of characters to be deleted. If exceeds the number of existing
     *      characters, it will simply stop after all characters are deleted
     * @param resolve The Promise's resolve function to be executed after process is done. Used in
     *      `CursorEventQueue`
     */
    async delete( count: number = Infinity, resolve?:(value:unknown)=>void ) {
        this.textCursor.setIsBlinking(false);
        while (count-- > 0 && (this.textNode.textContent || this.textNode.previousSibling) ) {
            await getTimeoutPromise( ()=> {
                this._delete(1);
            }, this.deleteMsPerCharacter);
        }
        this.textCursor.setIsBlinking(true);

        if (resolve) resolve(undefined);
    }


    /**
     * Clears the textbox __Immediately__ of any text
     * 
     * @param resolve The Promise's resolve function to be executed after process is done. Used in
     *      `CursorEventQueue`
     */
    async clear( resolve?:(value:unknown)=>void ) {
        this._delete( Infinity );
        if (resolve) resolve(undefined);
    }


    /**
     * Change the configuration of the TextTyper (typeCPS, deleteCPS, blinkDuration).
     * 
     * @param param0 Configuration object
     * @param resolve The Promise's resolve function to be executed after process is done. Used in
     *      `CursorEventQueue`
     */
    async configure({
        typeCPS,
        deleteCPS,
        blinkDuration
    }: ITextTyperConfig, resolve?:(value:unknown)=>void) 
    {
        if (typeCPS != undefined) {
            if (!isFinite(typeCPS) || typeCPS <= 0) throw "The type character per second (typeCPS) must be greater than 0!";
            this.typeMsPerCharacter = 1000 / typeCPS;       // Convert to milliseconds per character
        }

        if (deleteCPS != undefined) {
            if (!isFinite(deleteCPS) || deleteCPS <= 0) throw "The delete character per second (deleteCPS) must be greater than 0!";
            this.deleteMsPerCharacter = 1000 / deleteCPS;   // Convert to milliseconds per character    
        }

        if (blinkDuration != undefined) this.textCursor.setBlinkingDuration(blinkDuration);

        if (resolve) resolve(undefined);
    }


    /**
     * Initializes and returns the `TextTyperEventQueue` to obtain the ability to chain events
     * 
     * @returns TextTyperEventQueue instance
     */
    getEventQueue(): TextTyperEventQueue {
        return new TextTyperEventQueue(this);
    }

}



export default TextTyper;