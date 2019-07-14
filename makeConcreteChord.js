import * as note from './note.js'
import * as chrd from './chord.js'

// NOTE: this whole file is more-or-less a placeholder for a more useful
// concrete-chord-creating interface, but more thought is required to
// design that

export function makeConcreteChord(abstractChord, config = {})
{
    let ret = new chrd.Chord();
    
    for(let abstractNote of abstractChord.notes)
    {
        let concreteNote = makeConcreteNote(abstractNote, config);
        ret.notes.push(concreteNote);
    }
    
    if (config.numNotes)
    {
        const range = config.numNotes.max - config.numNotes.min;
        const numNotes = Math.floor(Math.random() * (range + 1)) + config.numNotes.min;
        const MAX_ITS = 20;
        const its = 0;
        
        while (its < MAX_ITS && ret.notes.length < numNotes)
        {
            const abstractNoteArray = Array.from(abstractChord.notes);
            const chosenAbstractNote = abstractNoteArray[Math.floor(Math.random() * abstractNoteArray.length)];
            const concreteNote = makeConcreteNote(chosenAbstractNote, config);
            if (!isNoteInChord(concreteNote, ret))
            {
                ret.notes.push(concreteNote);
            }
        }
    }
    
    return ret;
}

function makeConcreteNote(abstractNote, config = {})
{
    const concreteNoteIndex = (abstractNote + NOTE_NAME_TO_OFFSET_MAP.get(config.key)) % 12;
    const possibleNoteIndices = new Array;
    const noteRange = {min: getNoteIndex(config.range.min || "C3"), max: getNoteIndex(config.range.max || "A4")};
    
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
    return new note.Note(note.getFreq(noteName));
}

function isNoteInChord(concreteNote, concreteChord)
{
    for (const chosenNote of concreteChord.notes)
    {
        const absFreqDiff = Math.abs(chosenNote.freq - concreteNote.freq);
        const pctDiff = absFreqDiff / chosenNote.freq;
        if (pctDiff < (Math.pow(2, 1/12) - 1) / 10) return true;
    }
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
    
