// defines a chord relative to a key without a concrete voicing

const NOTES_IN_OCTAVE = 12;

export class AbstractChord
{
    constructor(notes = new Set)
    {
        this.notes = notes;
    }
    
    addNote(newNote)
    {
        newNote %= NOTES_IN_OCTAVE;
        return new AbstractChord(new Set([...this.notes, newNote]));
    }
    
    flatten()
    {
        let ret = new AbstractChord(new Set(...this.notes));
        if (ret.notes) ret.notes.forEach((note) => note = (note + NOTES_IN_OCTAVE - 1) % NOTES_IN_OCTAVE);
        return ret;
    }
    
    sharpen()
    {
        let ret = new AbstractChord(new Set(...this.notes));
        if (ret.notes) ret.notes.forEach((note) => note = (note + 1) % NOTES_IN_OCTAVE);
        return ret;
    }
}