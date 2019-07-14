import {makeConcreteChord} from './makeConcreteChord.js'
import {Chord} from './chord.js'

export function makeConcreteChordProgression(abstractChordProgArray, config = {})
{
    // dont even use config here.. there's got to be a better architectural solution;
    // it needs to be a stored piece of state in the model.
    return abstractChordProgArray.map(
        function(abstractChord)
        {
            console.log("abstractChord:"); 
            console.log(abstractChord); 
            return makeConcreteChord(abstractChord, config);
        }
    );
}