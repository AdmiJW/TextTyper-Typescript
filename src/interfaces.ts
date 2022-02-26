/** @author AdmiJW */



//*==============//
//* Text Cursor  //
//*==============//

interface ITextCursor {
    blinkDuration: number;
    isBlinking: boolean;

    setBlinkingDuration(duration: number): ITextCursor;
    setIsBlinking(turnOn: boolean): ITextCursor;
}




//*==============//
//* Text Typer   //
//*==============//

interface ITextTyperConfig {
    typeCPS?: number,
    deleteCPS?: number,
    blinkDuration?: number,
}

abstract class ITextTyper {
    // Static members - Refer to dependent classes (constructor)
    static readonly TextCursor: new(blinkDuration: number)=> ITextCursor;   
    static readonly TextTyperEventQueue: new(textTyper: ITextTyper)=> ITextTyperEventQueue;

    // Class properties
    abstract textbox: HTMLElement;
    abstract typeMsPerCharacter: number;
    abstract deleteMsPerCharacter: number;
    abstract textCursor: ITextCursor;
    abstract textNode: Text;

    abstract _type( char: string ): void;
    abstract _delete( n: number ): void;
    abstract _newline(): void;

    abstract type( text:string , resolve?: (value:unknown)=>void ): Promise<void>;
    abstract putText( text: string, resolve?: (value:unknown)=>void ): Promise<void>;
    abstract delete( count: number, resolve?:(value:unknown)=>void ): Promise<void>;
    abstract clear( resolve?:(value:unknown)=>void ): Promise<void>;
    abstract configure({
        typeCPS,
        deleteCPS,
        blinkDuration
    }: ITextTyperConfig, resolve?:(value:unknown)=>void): Promise<void>;
    abstract getEventQueue(): ITextTyperEventQueue;
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
    loop( count: number ): ITextTyperEventQueue;
    standby( time: number ): ITextTyperEventQueue;
    clearHistory(): ITextTyperEventQueue;
    type( text: string ): ITextTyperEventQueue;
    putText( text: string ): ITextTyperEventQueue;
    delete( count: number ): ITextTyperEventQueue;
    clear(): ITextTyperEventQueue;
    configure({
        typeCPS,
        deleteCPS,
        blinkDuration,
    }: ITextTyperConfig): ITextTyperEventQueue;
}


export { ITextCursor, ITextTyperConfig, ITextTyper, IEventRecord, ITextTyperEventQueue };