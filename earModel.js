import {DEFAULT_SETTINGS} from './settings.js'
import {createAbstractChordProgression} from './createAbstractChordProgression.js'

// handles update of state of core app functionality
export class EarModel
{
    constructor()
    {
        this.abstractAnswerChords = Array;
        this.abstractInputChords = Array;
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        this.numCorrect = 0;
        this.numWrong = 0;
        this.subscriber = undefined;
        this.init();
    }
    
    init()
    {
        this.abstractAnswerChords = createAbstractChordProgression();
    }
    
    getAnswerChords() { return this.abstractAnswerChords; }
    
    subscribe(subscriber) { this.subscriber = subscriber; }
    update() { if(this.subscriber) this.subscriber.update(); }
    
    isInputChordsCorrect() { return this.abstractInputChords === this.abstractAnswerChords; }
    getSettings() { return this.settings; }
}