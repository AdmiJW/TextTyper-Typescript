/** @author AdmiJW */

import { getTimeoutPromise } from '../utils';
import TextTyper from './TextTyper';
import { IEventRecord, ITextTyperConfig, ITextTyperEventQueue } from '../interfaces';




class TextTyperEventQueue implements ITextTyperEventQueue {
    textTyper: TextTyper;
    eventQueue: Array<IEventRecord> = [];
    historyQueue: Array<IEventRecord> = [];


    /**
     * @param textTyper The underlying `TextTyper` which the event queue acts on.
     */
    constructor( textTyper: TextTyper ) {
        this.textTyper = textTyper;
    }



    //*=================================
    //* Public, chainable methods
    //*=================================

    /**
     * Kickstart the event queue, executing each event in the event queue in sequential order
     */
    async start() {
        while (this.eventQueue.length) {
            const event = this.eventQueue.shift()!;
            await new Promise((resolve)=> this._executeFunc( event, resolve, true ));
        }
    }


    
    /**
     * Repeats the previous events for specified number of times. Default is infinity,
     * which iterates forever.
     * 
     * @param count The number of iterations that the previous events should
     *      repeat
     * @returns The current instance of `TextTyperEventQueue`
     */
    loop( count=Infinity ): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this,
            eventFunc: this._looper,
            args: [count]
        });
        return this;
    }


    /**
     * Adds a standby event to the event queue. The text typer
     * will idle for specified amount of milliseconds
     * 
     * @param time Time in milliseconds for text typer idle
     * @returns this instance
     */
    standby( time:number ): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this,
            eventFunc: this._standby,
            args: [time]
        });
        return this;
    }


    /**
     * Clears the history queue, so the previously executed event
     * won't be repeated whenever a loop event is encountered.
     * 
     * @returns this instance
     */
    clearHistory(): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this,
            eventFunc: this._looper,
            args: [0]
        });
        return this;
    }


    /**
     * Adds type event
     * 
     * Types the provided string into the text box, character by character, following the
     * configured typeCPS (Character per second)
     * 
     * @param text The text to be typed into the textbox
     * @returns this instance
     */
    type( text:string ): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this.textTyper,
            eventFunc: this.textTyper.type,
            args: [text]
        });
        return this;
    }


    /**
     * Adds a putText event
     * 
     * Puts the text __immediately__ into the textbox without typing one by one
     * 
     * @param text The text to be appended immediately into the textbox
     * @returns this instance
     */
    putText( text:string ): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this.textTyper,
            eventFunc: this.textTyper.putText,
            args: [text]
        });
        return this;
    }


    /**
     * Adds a delete event
     * 
     * Deletes the specified number of characters from the end of the text within the text node.
     * 
     * @param count Number of characters to be deleted. If exceeds the number of existing
     *      characters, it will simply stop after all characters are deleted
     * @returns this instance
     */
    delete( count = Infinity ): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this.textTyper,
            eventFunc: this.textTyper.delete,
            args: [count]
        });
        return this;
    }


    /**
     * Adds a clear event
     * 
     * Clears the textbox __Immediately__ of any text
     * 
     * @returns this instance
     */
    clear(): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this.textTyper,
            eventFunc: this.textTyper.clear,
            args: []
        });
        return this;
    }


    /**
     * Adds a configuration event
     * 
     * Change the configuration of the TextTyper (typeCPS, deleteCPS, blinkDuration).
     * 
     * @param param0 Configuration object
     * @returns this instance
     */
    configure(config: ITextTyperConfig): TextTyperEventQueue {
        this.eventQueue.push({
            thisBinding: this.textTyper,
            eventFunc: this.textTyper.configure,
            args: [config]
        });
        return this;
    }


    //*=================================
    //* Private methods
    //*=================================

    /**
     * Method that executes an `EventRecord`. Used when the event queue execution is started
     * 
     * @param event An `EventRecord` to be executed
     * @param resolve The Promise's `resolve()` method to be passed and resolved whenever the event is done executing
     */
    private _executeFunc( 
        event: IEventRecord, 
        resolve: (value:any)=>void,
        pushToHistory?: boolean,
    ) {
        const {thisBinding, eventFunc, args} = event;

        if (pushToHistory) this.historyQueue.push(event);
        eventFunc.call(thisBinding, ...args, resolve);
    }


    /**
     * Method that loops every event in the history queue for specified number of times
     * (default `Infinity`). 
     * 
     * Note that after looping is completed, the history queue is cleared to empty, and subsequent
     * events will be added anew
     * 
     * @param count Number of iterations to loop, default `Infinity`
     * @param resolve 
     */
    private async _looper( count=Infinity, resolve: (value:unknown)=>void ) {
        // If it has to loop infinite times, resolve the promise immediately
        // to prevent blocking
        if (count === Infinity) resolve(undefined);

        while (count-- > 0) {
            for (let event of this.historyQueue) {
                // Be careful - The looper should not execute the _looper, which causes infinite recursion
                if (event.eventFunc === this._looper) continue;
                await new Promise((resolve)=> this._executeFunc(event, resolve, false));
            }
        }

        // Clears the history queue after the iterations are completed.
        this.historyQueue = [];
        resolve(undefined);
    }


    /**
     * Will create an effect of 'pausing' the execution of events for specified
     * durtation before next event. Useful only in event queue.
     * 
     * @param time Time in milliseconds for the standby duration
     * @param resolve 
     */
    private async _standby( time: number, resolve: (value:unknown)=>void) {
        await getTimeoutPromise(()=> {}, time);
        if (resolve) resolve(undefined);
    }

}



export default TextTyperEventQueue;