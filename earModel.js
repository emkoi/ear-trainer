import {DEFAULT_SETTINGS} from './settings.js'

// handles update of state of core app functionality
export class EarModel
{
    constructor()
    {
        this.answerChords = Array;
        this.inputChords = Array;
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        this.numCorrect = 0;
        this.numWrong = 0;
        this.subscriber = undefined;
    }
    
    subscribe(subscriber) { this.subscriber = subscriber; }
    update() { if(this.subscriber) this.subscriber.update(); }
    
    isInputChordsCorrect() { return this.inputChords === this.answerChords; }
    getSettings() { return this.settings; }
}