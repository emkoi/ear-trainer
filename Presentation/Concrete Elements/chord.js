import {Note, getFreq} from './note.js'

export class Chord
{
    constructor(...notes)
    {
        this.notes = notes;
    }
    
    transpose(offset)
    {
        return new Chord(...this.notes.map((note) => note.transpose(offset)));
    }
}

export const A4 = new Chord(new Note(getFreq("A4")));

export const C_MINOR = new Chord(
    new Note(getFreq("C4")), 
    new Note(getFreq("Eb4")),
    new Note(getFreq("G4"))
);

export const C_MAJOR = new Chord(
    new Note(getFreq("C4")), 
    new Note(getFreq("E4")),
    new Note(getFreq("G4"))
)