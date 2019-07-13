import * as note from './note.js'
import * as chrd from './chord.js'

// this constant should maybe be in a file with higher scope
const REFERENCE_NOTE_A0 = 0; // lowest note on a piano

const DEFAULT_CONFIGURATION = {
    key:"C",
    range: {min:REFERENCE_NOTE_A0 + 12*3, max:REFERENCE_NOTE_A0 + 12*5}
}

export function makeConcreteChord(abstractChord, configuration = DEFAULT_CONFIGURATION)
{
    let ret = new chrd.Chord();
    
    const key = configuration.key;
    
    for(let abstractNote in abstractChord.notes)
    {
        let concreteNote = makeConcreteNote(abstractNote, configuration);
        ret.notes.push(concreteNote);
    }
    
    return ret;
}

function makeConcreteNote(abstractNote, config = DEFAULT_CONFIGURATION)
{
    const possibleNoteIndices = new Array;
    
    for (let possibleNoteIndex = config.range.min; possibleNoteIndex <= config.range.max; possibleNoteIndex++)
    {
        if (isSameNoteName(abstractNote, possibleNoteIndex))
        {
            possibleNoteIndices.push(possibleNoteIndex);
        }
    }
    
    const randomIndex = Math.floor(Math.random() * possibleNoteIndices.length);
    const chosenNoteIndex = possibleNoteIndices[randomIndex];
    const noteName = getNoteName(chosenNoteIndex);
    return note.Note(note.getFreq(noteName));
}

function isSameNoteName(a, b)
{
    return Math.abs(a - b) % 12 === 0;
}

const NOTE_INDEX_TO_NAME_MAP = new Map([
    [0, "A"],
    [1, "Bb"],
    [2, "B"],
    [3, "C"],
    [4, "Db"],
    [5, "D"],
    [6, "Eb"],
    [7, "E"],
    [8, "F"],
    [9, "Gb"],
    [10, "G"],
    [11, "Ab"]
]);

// getNoteName(12) -> "A1"
function getNoteName(index)
{
    const octaveNum = Math.floor((index + 3) / 12)
    while (index < 0) index += 12;
    index %= 12;
    
    return NOTE_INDEX_TO_NAME_MAP.get(index) + octaveNum.toString();
}
    
