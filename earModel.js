import {DEFAULT_SETTINGS} from './settings.js'
import {createAbstractChordProgression} from './createAbstractChordProgression.js'

// a layer between the controller and the core app.
// the EarModel can project a subset of the core app's state,
// specifically, the part a view might want.
// so this is technically a ViewModel; it will know about the
// Domain model, but not vice-versa
export class EarModel
{
    constructor()
    {
        this.abstractAnswerChords = []];
        this.abstractInputChords = []];
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        this.numCorrect = 0;
        this.numWrong = 0;
        this.subscriber = undefined;
        this.init();
    }
    
    init()
    {
        this.abstractAnswerChords = createAbstractChordProgression(this.settings);
    }
    
    getConfig() { return this.settings; }
    
    getAnswerChords() { return this.abstractAnswerChords; }
    
    subscribe(subscriber) { this.subscriber = subscriber; }
    update() { if(this.subscriber) this.subscriber.update(); }
    
    isInputChordsCorrect() { return this.abstractInputChords === this.abstractAnswerChords; }
    getSettings() { return this.settings; }
}