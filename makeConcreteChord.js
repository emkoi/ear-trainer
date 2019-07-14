import * as note from './note.js'
import * as chrd from './chord.js'

// NOTE: this whole file is more-or-less a placeholder for a more useful
// concrete-chord-creating interface, but more thought is required to
// design that

// this constant should maybe be in a file with higher scope
const REFERENCE_NOTE_A0 = 0; // lowest note on a piano

const DEFAULT_CONFIGURATION = {
    key:"C",
    range: {min:REFERENCE_NOTE_A0 + 12*3, max:REFERENCE_NOTE_A0 + 12*4}
}

export function makeConcreteChord(abstractChord, config = DEFAULT_CONFIGURATION)
{
    console.log("makeConcreteChord took:");
    console.log(abstractChord);
    let ret = new chrd.Chord();
    
    for(let abstractNote of abstractChord.notes)
    {
        let concreteNote = makeConcreteNote(abstractNote, config);
        ret.notes.push(concreteNote);
    }
    
    console.log("...and returned:");
    console.log(ret);
    return ret;
}

function makeConcreteNote(abstractNote, config = DEFAULT_CONFIGURATION)
{
    const concreteNoteIndex = (abstractNote + NOTE_NAME_TO_OFFSET_MAP.get(config.key)) % 12;
    const possibleNoteIndices = new Array;
    const noteRange = {min: getNoteIndex(config.range.min), max: getNoteIndex(config.range.max)};
    
    for (let possibleNoteIndex = noteRange.min; possibleNoteIndex <= noteRange.max; possibleNoteIndex++)
    {
        if (isSameNoteName(concreteNoteIndex, possibleNoteIndex))
        {
            possibleNoteIndices.push(possibleNoteIndex);
        }
    }
    
    const randomIndex = Math.floor(Math.random() * possibleNoteIndices.length);
    const chosenNoteIndex = possibleNoteIndices[randomIndex];
    const noteName = getNoteName(chosenNoteIndex);
    console.log("created concrete note: " + noteName);
    return new note.Note(note.getFreq(noteName));
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

const NOTE_NAME_TO_OFFSET_MAP = new Map([
    ["A", 0],
    ["Bb", 1],
    ["B", 2],
    ["C", 3],
    ["Db", 4],
    ["D", 5],
    ["Eb", 6],
    ["E", 7],
    ["F", 8],
    ["Gb", 9],
    ["G", 10],
    ["Ab", 11]
]);

// getNoteName(12) -> "A1"
function getNoteName(index)
{
    const octaveNum = Math.floor((index - 3) / 12) + 1;
    while (index < 0) index += 12;
    index %= 12;
    
    return NOTE_INDEX_TO_NAME_MAP.get(index) + octaveNum.toString();
}

function getNoteIndex(noteName)
{
    let octaveNum = parseInt(noteName.slice(-1));
    const name = noteName.slice(0, -1);
    if (name !== "A" && name !== "Bb" && name !== "B") octaveNum--;
    
    return octaveNum * 12 + NOTE_NAME_TO_OFFSET_MAP.get(name)
}
    
