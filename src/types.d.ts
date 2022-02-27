/** @author AdmiJW */



//*==============//
//* Text Cursor  //
//*==============//

interface ITextCursor  {
    blinkDuration: number;
    isBlinking: boolean;
    html: HTMLElement;

    setBlinkingDuration(duration: number): this;
    setIsBlinking(turnOn: boolean): this;
    getHTML(): HTMLElement;
}




//*==============//
//* Text Typer   //
//*==============//

interface ITextTyperConfig {
    typeCPS?: number,
    deleteCPS?: number,
    blinkDuration?: number,
}

interface ITextTyper {
    textbox: HTMLElement;
    typeMsPerCharacter: number;
    deleteMsPerCharacter: number;
    textCursor: ITextCursor;
    textNode: Text;

    
    _type( char: string ): void;
    _delete( n: number ): void;
    _newline(): void;

    type( text:string , resolve?: (value:unknown)=>void ): Promise<void>;
    putText( text: string, resolve?: (value:unknown)=>void ): Promise<void>;
    delete( count: number, resolve?:(value:unknown)=>void ): Promise<void>;
    clear( resolve?:(value:unknown)=>void ): Promise<void>;
    configure({
        typeCPS,
        deleteCPS,
        blinkDuration
    }: ITextTyperConfig, resolve?:(value:unknown)=>void): Promise<void>;
    getEventQueue(): ITextTyperEventQueue;
}




//*==========================//
//* Text Typer Event Queue  //
//*=========================//

type IEventRecord = {
    /** The 'this' object to be binded to the `eventFunc` during invocation */
    thisBinding: object,
    /** The function to be executed to complete the event */
    eventFunc: (...args: any)=> void,
    /** An array of arguments to be passed into the `eventFunc`, in sequence */
    args: [...args: any],
};

interface ITextTyperEventQueue {
    textTyper: ITextTyper;
    eventQueue: Array<IEventRecord>;
    historyQueue: Array<IEventRecord>;

    start(): Promise<void>;
    loop( count: number ): this;
    standby( time: number ): this;
    clearHistory(): this;
    type( text: string ): this;
    putText( text: string ): this;
    delete( count: number ): this;
    clear(): this;
    configure({
        typeCPS,
        deleteCPS,
        blinkDuration,
    }: ITextTyperConfig): this;
}


//*==============================//
//* Global object augmentation  //
//*=============================//
// Since 3 classes will be exposed to the 'window' object, augment to have typing support
declare global {
    interface Window { 
        TextCursor: new(blinkDuration: number)=> ITextCursor;
        TextTyper: new(textbox: HTMLElement, config: ITextTyperConfig)=> ITextTyper;
        TextTyperEventQueue: new(textTyper: ITextTyper)=> ITextTyperEventQueue;
    }
}


export { ITextCursor, ITextTyperConfig, ITextTyper, IEventRecord, ITextTyperEventQueue };