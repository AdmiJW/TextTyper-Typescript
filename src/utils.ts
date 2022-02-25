/** @author AdmiJW */


interface HTMLClassIDManipulateOptions {
    /** A list of classNames to be added to the `classList` of `HTMLElement` */
    classNames?: string[],
    /** The ID to be set on the `HTMLElement` */
    id?: string,
    /** 
     * Boolean flag whether to clear previous classNames on the `HTMLElement` 
     * before appending the ones in `classNames`
    */
    clearClassNames?: boolean
};


/**
 * A function to manipulate the classes and ID of an HTML element.
 * 
 * @param htmlElement The `HTMLElement` to perform manipulation on.
 * @param param1 `HTMLClassIDManipulateOptions`
 */
function manipulateHTMLClassID(
    htmlElement: HTMLElement,  
    {
        classNames = [],
        id,
        clearClassNames = false
    }: HTMLClassIDManipulateOptions = {}
): void {
    if (clearClassNames) {
        // Clear the previous classes if clearClassNames flag is true
        [...htmlElement.classList.values()].forEach((cls)=> {
            htmlElement.classList.remove(cls);
        });

        // Append all the specified classes in classNames
        classNames.forEach((cls)=> htmlElement.classList.add(cls));

        // If ID is specified, set the ID on the html element
        if (id) htmlElement.id = id;
    };
}



//====================================================================================



interface HTMLElementFactoryOptions {
    /** A list of classNames to be set on the `classList` of created `HTMLElement` */
    classNames?: string[],
    /** The ID to be set on the created `HTMLElement` */
    id?: string
};


/**
 * Creates an `HTMLElement` with specified tag name (Eg: `"div"`), optionally with
 * classes and ID to be applied
 * 
 * @param tagName Tag name of the `HTMLElement` (Eg: `"div"`)
 * @param param1 `HTMLElementFactoryOptions`
 * @returns The initialized `HTMLElement` of type `K`
 */
function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    {
        classNames = [],
        id
    }: HTMLElementFactoryOptions = {}
): HTMLElementTagNameMap[K] {
    const element = document.createElement<K>(tagName);
    
    classNames.forEach(cls => element.classList.add(cls));
    if (id) element.id = id;

    return element;
}



//====================================================================================


/**
 * Returns a promise which when ran, will execute the callback function provided,
 * either before or after the specified delay (in milliseconds), and resolves with the
 * return value of the callback function with type `T`
 * 
 * @param callback 
 * @param callbackArgs 
 * @param delay 
 * @param execAfter 
 * @returns 
 */
function getTimeoutPromise<T>(
    callback: (...args: any[])=> any, 
    delay: number,
    callbackArgs: any[] = [],
    execAfter = false
): Promise<T> {
    return new Promise((resolve)=> {
        let result: T;
        if (!execAfter) result = callback( ...callbackArgs );

        setTimeout(()=> {
            if (execAfter) result = callback( ...callbackArgs );
            resolve(result);
        }, delay);
    });
}




export {
    manipulateHTMLClassID,
    createHTMLElement,
    getTimeoutPromise,
};