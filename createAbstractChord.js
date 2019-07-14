import {AbstractChord} from './abstractChord.js'

// it may be worth creating a prototype object for configuration with 
// the defaults, so users could see the fields without looking at the
// implementation of this function
export function createAbstractChord(configuration = {})
{
    let ret = new AbstractChord();
    const DEFAULT_NUM_NOTES = 3;
    

    { // adding random notes
        const numNotes = configuration.numNotes || DEFAULT_NUM_NOTES;
        while (ret.notes.size < numNotes)
        {
            let newNote = Math.floor(Math.random() * 12);
            ret = ret.addNote(newNote);
        }
    }

    { // adding specific notes
        if (configuration.mustContain)
        {
            let newRet = configuration.mustContain;
            const numNotes = configuration.numNotes || DEFAULT_NUM_NOTES;
            ret.notes.forEach((note) => {if(newRet.size < numNotes) newRet.add(note)});
            ret = newRet;
        }
    }
    
    return ret;
}