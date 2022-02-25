/** @author AdmiJW */


interface DefaultConfigurations {
    // Since the cursor uses custom element, it requires a DOMString
    readonly HTML_DOMSTRING_NAME: string;

    //  Default Values used when Cursor first initializes
    readonly DEFAULT_BLINK_PERIOD: number;
    //  Default Values used when TextTyper first initializes
    readonly DEFAULT_TYPE_CPS: number;
    readonly DEFAULT_DELETE_CPS: number;
}

const DEFAULTS: DefaultConfigurations = {
    HTML_DOMSTRING_NAME: 'text-cursor',
    DEFAULT_BLINK_PERIOD: 1000,
    DEFAULT_TYPE_CPS: 10,
    DEFAULT_DELETE_CPS: 10,
};



export { DEFAULTS };
