import {createAbstractChord} from './createAbstractChord.js'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChordProgression(config = {})
{
    let ret = new Array;
    
    const DEFAULT_NUM_CHORDS = 3;
    const numChords = config.numChords || DEFAULT_NUM_CHORDS;
    
    for (let i = 0; i < numChords; i++) 
    {
        ret.push(createAbstractChord(config));
    }
    
    return ret;
}