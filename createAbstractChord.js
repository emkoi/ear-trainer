import {AbstractChord} from './abstractChord.js'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChord(config = {})
{
    let ret = new AbstractChord();
    const DEFAULT_NUM_NOTES = 3;
    
    if (config.enabledChords && config.enabledChords.size > 0)
    {
        {
            const chordNoteMap = new Map([
                ["I", new Set([0, 4, 7])],
                ["iii", new Set([4, 7, 11])],
                ["IV", new Set([5, 9, 0])]
            ]);
            const randomChordIndex = Math.floor(Math.random() * config.enabledChords.size);
            const randomChord = Array.from(config.enabledChords)[randomChordIndex];
            const chosenNotes = chordNoteMap.get(randomChord);
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