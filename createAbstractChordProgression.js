import {createAbstractChord} from './createAbstractChord.js'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChordProgression(config = {})
{
    let ret = [];
    
    const DEFAULT_NUM_CHORDS = 3;
    const numChords = config.numChords || DEFAULT_NUM_CHORDS;
    
    for (let i = 0; i < numChords; i++) 
    {
        let specificActions = {}
        
        { // set specific actions
            if (config.endWith && i === numChords - 1)
            {
                const selectedChord = config.endWith[Math.floor(Math.random() * config.endWith.length)];
                specificActions.makeChord = selectedChord;
            }
            else if (config.penultimateChord && i === numChords - 2)
            {
                const selectedChord = config.penultimateChord[Math.floor(Math.random() * config.penultimateChord.length)];
                specificActions.makeChord = selectedChord;
            }
        }
            
        ret.push(createAbstractChord(config, specificActions));
    }
    
    return ret;
}