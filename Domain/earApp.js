// this is the Domain; it knows nothing of any presentation-layer element.
// the only thing this will do is maintain the model--maybe not, because 
// the model can just be a proxy to this object.

import {isEqualChords} from './compareChords.js'
import {EarModel} from './earModel.js'
import {messages} from '../Presentation/messageEnum.js'

export class EarApp
{
    // public interface
    
    constructor()
    {
        this._settings = undefined; // assign this to a default later
        this._answerProgression = generateProgression(this._settings);
        this.correctCount = 0;
        this.wrongCount = 0;
        this._earModel = new EarModel(this);
    }
    
    model()
    {
        return this._earModel;
    }
    
    submitGuess(guessedChords)
    {
        let wrongChordIndices = [];
        let correctGuess = true;
        for (let i = 0; i < this._answerProgression.length; i++)
        {
            if (!isEqualChords(guessedChords[i], this._answerProgression[i]))
            {
                wrongChordIndices.push(i);
                correctGuess = false;
            }
        }
        
        if (!correctGuess)  
        {        
            this._onIncorrectGuess(wrongChordIndices);
        }
        else
        {
            this._onCorrectGuess();
        }
        
    }
    
    // called by explicit user skipping but also after 'next' after the user guesses
    skipToNextProgression()
    {
        this._answerProgression = generateProgression(this._settings);
        this._onMoveToNextProgression();
    }
    
    modifySettings(newSettings)
    {
        // make sure this is unlike the settings object in settings.js and like the
        // object in domainSettings.js
        this._settings = newSettings;
    }
    
    reset()
    {
        this._settings = undefined; // assign this to a default later
        this.wrongCount = 0;
        this.correctCount = 0;
        this._earModel.sendMessage(messages.COUNTS_RESET);
        this.skipToNextProgression();
    }
    
    // private interface
    
    _onIncorrectGuess(badlyGuessedChordIndices)
    {
        this.wrongCount++;
    }
    
    _onCorrectGuess()
    {
        this.correctCount++;
    }
    
    _onMoveToNextProgression()
    {
        this._earModel.sendMessage(messages.NEW_PROGRESSION);
    }
}
