import {makeConcreteChord} from './makeConcreteChord.js'
import {Chord} from '../Concrete Elements/chord.js'

export function makeConcreteChordProgression(abstractChordProgArray, config = {})
{
    // dont even use config here.. there's got to be a better architectural solution;
    // it needs to be a stored piece of state in the model.
    return abstractChordProgArray.map(
        function(abstractChord)
        {
            return makeConcreteChord(abstractChord, config);
        }
    );
}