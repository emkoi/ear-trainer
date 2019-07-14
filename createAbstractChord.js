import {AbstractChord} from './abstractChord.js'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChord(config = {}, specificActions = {})
{
    let ret = new AbstractChord();
    const DEFAULT_NUM_NOTES = 3;
    
    if (config.enabledChords && config.enabledChords.size > 0)
    {
        {
            const chordNoteMap = new Map([
                ["I", new Set([0, 4, 7])],
                ["ii", new Set([2, 5, 9])],
                ["iii", new Set([4, 7, 11])],
                ["IV", new Set([5, 9, 0])],
                ["V", new Set([7, 11, 2])],
                ["vi", new Set([9, 0, 4])],
                ["viib5", new Set([11, 2, 5])]
            ]);
            
            let chosenNotes = new Set;
            
            if (specificActions.makeChord)
            {
                console.log("chord: " + specificActions.makeChord);
                chosenNotes = chordNoteMap.get(specificActions.makeChord);
            }
            else
            {
                const randomChordIndex = Math.floor(Math.random() * config.enabledChords.size);
                const randomChord = Array.from(config.enabledChords)[randomChordIndex];
                console.log("chord: " + randomChord);
                chosenNotes = chordNoteMap.get(randomChord);
            }
            
            
            chosenNotes.forEach((newNote) => ret = ret.addNote(newNote));
        }
    }
    else
    {
        { // adding random notes
            const numNotes = config.numNotes || DEFAULT_NUM_NOTES;
            while (ret.notes.size < numNotes)
            {
                let newNote = Math.floor(Math.random() * 12);
                ret = ret.addNote(newNote);
            }
        }

        { // adding specific notes
            if (config.mustContain)
            {
                let newRet = new AbstractChord(config.mustContain);
                const numNotes = config.numNotes || DEFAULT_NUM_NOTES;
                ret.notes.forEach((note) => {if(newRet.notes.size < numNotes) newRet = newRet.addNote(note);});
                ret = newRet;
            }
        }
    }
    
    return ret;
}