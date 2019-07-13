import {createAbstractChord} from './createAbstractChord'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChordProgression(configuration = {})
{
    let ret = new Array;
    
    const DEFAULT_NUM_CHORDS = 3;
    const numChords = configuration.numChords || DEFAULT_NUM_CHORDS;
    
    for (let i = 0; i < numChords; i++) 
    {
        // something similar to what a default config would look like
        let chordConfig = {mustContain: new Set([0])};
        ret.push(createAbstractChord(chordConfig));
    }
    
    return ret;
}