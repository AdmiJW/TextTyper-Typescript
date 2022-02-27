/** @author AdmiJW */


interface DefaultConfigurations {
    // The cursor HTML element will have a 'data-is' attribute. The value here is used for the attribute
    readonly HTML_IS_ATTRIBUTE: string;

    //  Default Values used when Cursor first initializes
    readonly DEFAULT_BLINK_PERIOD: number;
    //  Default Values used when TextTyper first initializes
    readonly DEFAULT_TYPE_CPS: number;
    readonly DEFAULT_DELETE_CPS: number;
}

const DEFAULTS: DefaultConfigurations = {
    HTML_IS_ATTRIBUTE: 'text-cursor',       //! If this one is modified, the style.css in /styles has to modify as well!
    DEFAULT_BLINK_PERIOD: 1000,
    DEFAULT_TYPE_CPS: 10,
    DEFAULT_DELETE_CPS: 10,
};



export { DEFAULTS };
