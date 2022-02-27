/** @author AdmiJW */


import KEYBOARD_SOUNDS from "./SOUNDS";



interface ITextTyperSoundConfig {
    typeSound?: KEYBOARD_SOUNDS,
    deleteSound?: KEYBOARD_SOUNDS,
    typeVolume?: number,
    deleteVolume?: number
};


interface ITextTyper_Keysound {
    typeAudioHTML: HTMLAudioElement;
    deleteAudioHTML: HTMLAudioElement;

    configureKeysound (
        config: ITextTyperSoundConfig,
        resolve?: (value:unknown)=>void
    ): Promise<void>;
}



interface ITextTyperEventQueue_Keysound {
    configureKeysound (
        config: ITextTyperSoundConfig,
    ): this;
}