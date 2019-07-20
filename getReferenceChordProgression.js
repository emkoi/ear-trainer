import * as note from './note.js'
import {Chord} from './chord.js'

export function getReferenceChordProgression(config = {})
{
    const DEFAULT_KEY = "C";
    let key = config.key || DEFAULT_KEY;
    
    const first = new note.Note(note.getFreq(key + "4"));
    const second = first.transpose(2);
    const third = first.transpose(4);
    const fourth = first.transpose(5);
    const fifth = first.transpose(7);
    const sixth = first.transpose(9);
    const seventh = first.transpose(11);
    
    const oneChord = new Chord(first, third, fifth);
    const twoChord = new Chord(second, fourth, sixth);
    const sixChord = new Chord(sixth, first, third);
    const fiveChord = new Chord(fifth, seventh, second);
    const oneChord1stInversion = new Chord(third, fifth, first.transpose(12));
    
    return [oneChord, sixChord, twoChord, fiveChord, oneChord1stInversion];
}