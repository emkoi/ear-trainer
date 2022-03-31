import {DEFAULT_SETTINGS} from '../settings.js'
import {createAbstractChordProgression} from './Abstract Creation/createAbstractChordProgression.js'
import {EarApp} from './earApp.js'

// an element of the domain layer exposed to the presentation layer.
// the EarModel can project a subset of the core app's state
export class EarModel
{
    constructor(earApp)
    {
        this.settings = Object.assign({}, DEFAULT_SETTINGS);
        this.numCorrect = 0;
        this.numWrong = 0;
        this.subscribers = [];
        this.app = earApp;
        this.init();
    }
    
    // let the EarApp do this
    init()
    {
        this.abstractAnswerChords = createAbstractChordProgression(this.settings);
    }
    
    getConfig() { return this.settings; }
    
    getAnswerChords() { return this.abstractAnswerChords; }
    
    submitGuessedAnswerChords(guess) { this.app.submitGuess(guess); }
    skip() { this.app.skipToNextProgression(); }
    
    subscribe(subscriber) { this.subscribers.push(subscriber); }
    update() { this.subscribers.forEach((subscriber) => subscriber.update()); } // might have to bind subscriber
}