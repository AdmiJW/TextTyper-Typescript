import { ITextTyperConfig } from "../types";
import { ITextTyper_Keysound, ITextTyperSoundConfig, ITextTyperEventQueue_Keysound } from "./types";
import KEYBOARD_SOUNDS from "./SOUNDS";



// Augment TextTyper class
function __TextTyperInjector__(targetClass: typeof window.TextTyper) {
    return class extends targetClass implements ITextTyper_Keysound {
        typeAudioHTML: HTMLAudioElement;
        deleteAudioHTML: HTMLAudioElement;

        // Constructor decorator
        constructor(textbox: HTMLElement, config: ITextTyperConfig) {
            super(textbox, config);
            this.typeAudioHTML = document.createElement('audio');
            this.deleteAudioHTML = document.createElement('audio');
            
            this.typeAudioHTML.volume = 1;
            this.deleteAudioHTML.volume = 1;
        }

        // Decorate methods (override)
        _type( char: string ): void {
            this.typeAudioHTML.currentTime = 0.075;
            this.typeAudioHTML.play();
            super._type(char);
        }

        _delete( n: number ): void {
            this.deleteAudioHTML.currentTime = 0.075;
            this.deleteAudioHTML.play();
            super._delete( n );
        }


        // New methods
        async configureKeysound({
            typeSound,
            deleteSound,
            typeVolume,
            deleteVolume
        }: ITextTyperSoundConfig, resolve?: (value: unknown) => void): Promise<void> {
            if (typeSound) this.typeAudioHTML.src = typeSound;
            if (deleteSound) this.deleteAudioHTML.src = deleteSound;

            if (typeVolume) {
                if ( isFinite(typeVolume) && typeVolume >= 0 && typeVolume <= 1)
                    this.typeAudioHTML.volume = typeVolume;
                else throw `Invalid Typing Sound Volume Provided: ${typeVolume}`;
            }

            if (deleteVolume) {
                if ( isFinite(deleteVolume) && deleteVolume >= 0 && deleteVolume <= 1)
                    this.deleteAudioHTML.volume = deleteVolume;
                else throw `Invalid Delete Sound Volume Provided: ${deleteVolume}`;
            }

            if (resolve) resolve(undefined);
        }
    }
}



// Augment TextTyperEventQueue class
function __TextTyperEventQueueInjector__(targetClass: typeof window.TextTyperEventQueue) {
    return class extends targetClass implements ITextTyperEventQueue_Keysound {
        configureKeysound(config: ITextTyperSoundConfig): this {
            this.eventQueue.push({
                thisBinding: this.textTyper,
                eventFunc: (this.textTyper as typeof this.textTyper & ITextTyper_Keysound).configureKeysound,
                args: [config]
            })
            return this;
        }
    }
}




window.TextTyper = __TextTyperInjector__(window.TextTyper);
window.TextTyperEventQueue = __TextTyperEventQueueInjector__(window.TextTyperEventQueue);



export default KEYBOARD_SOUNDS;