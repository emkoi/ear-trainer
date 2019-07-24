import {DEFAULT_SETTINGS} from './settings.js'
import {createAbstractChordProgression} from './Domain/Abstract Creation/createAbstractChordProgression.js'

// an element of the domain layer exposed to the presentation layer.
// the EarModel can project a subset of the core app's state
export class EarModel
{
    constructor()
    {
        this.abstractAnswerChords = [];
        this.abstractInputChords = [];
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        this.numCorrect = 0;
        this.numWrong = 0;
        this.subscribers = [];
        this.init();
    }
    
    init()
    {
        this.abstractAnswerChords = createAbstractChordProgression(this.settings);
    }
    
    getConfig() { return this.settings; }
    
    getAnswerChords() { return this.abstractAnswerChords; }
    
    subscribe(subscriber) { this.subscribers.push(subscriber); }
    update() { this.subscribers.forEach((subscriber) => subscriber.update()); } // might have to bind subscriber
    
    isInputChordsCorrect() { return this.abstractInputChords === this.abstractAnswerChords; }
    getSettings() { return this.settings; }
}