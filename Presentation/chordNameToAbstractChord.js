import {ChordName} from './chordName.js'
import {AbstractChord} from '../Domain/Abstract Creation/abstractChord.js'

const roots =
{
    "i": 0,
    "I": 0,
    "ii": 2,
    "II": 2,
    "iii": 4,
    "III": 4,
    "iv": 5,
    "IV": 5,
    "v": 7,
    "V": 7,
    "vi": 9,
    "VI": 9,
    "vii": 11,
    "VII": 11
};

const MIN_2_INTERVAL = 1;
const MAJ_2_INTERVAL = 2;
const MIN_3_INTERVAL = 3;
const MAJ_3_INTERVAL = 4;
const PERF_4_INTERVAL = 5;
const AUG_4_INTERVAL = 6;
const DIM_5_INTERVAL = 6;
const PERF_5_INTERVAL = 7;
const AUG_5_INTERVAL = 8;
const MIN_6_INTERVAL = 8;
const MAJ_6_INTERVAL = 9;
const DIM_7_INTERVAL = 9;
const MIN_7_INTERVAL = 10;
const MAJ_7_INTERVAL = 11;

export function chordNameToAbstractChord(chordName)
{
    const numeral = chordName.numeral;
    let root = roots[numeral];
    
    if (chordName.prefix === "b") root--;
    else if (chordName.prefix === "#") root++;
    
    let second = undefined;
    if (chordName.suffix === "Phryg") second = root + MIN_2_INTERVAL;
    else if (chordName.suffix === "sus2") second = root + MAJ_2_INTERVAL;
    
    let third = undefined;
    if (!["Phryg", "sus2", "Lyd", "sus4"].includes(chordName.suffix))
    {
        if (chordName.numeral === chordName.numeral.toLowerCase())
        {
            third = root + MIN_3_INTERVAL;
        }
        else if (chordName.numeral === chordName.numeral.toUpperCase())
        {
            third = root + MAJ_3_INTERVAL;
        }
    }
    
    let fourth = undefined;
    if (chordName.suffix === "sus4") fourth = root + PERF_4_INTERVAL;
    else if (chordName.suffix === "Lyd") fourth = root + AUG_4_INTERVAL;
    
    let fifth = root + PERF_5_INTERVAL;
    if (["7b5", "dim7", "dim", "b5"].includes(chordName.suffix))
    {
        fifth = root + DIM_5_INTERVAL;
    }
    else if (["+7", "+M7", "+"].includes(chordName.suffix))
    {
        fifth = root + AUG_5_INTERVAL;
    }
    
    let sixth = undefined;
    
    let seventh = undefined;
    if (chordName.suffix === "dim7")
    {
        seventh = root + DIM_7_INTERVAL;
    }
    else if (["7", "7b5", "+7"].includes(chordName.suffix))
    {
        seventh = root + MIN_7_INTERVAL;
    }
    else if (["M7", "+M7", "m/M7"].includes(chordName.suffix))
    {
        seventh = root + MAJ_7_INTERVAL;
    }
    
    let abstractChordNotes = [root, second, third, fourth, fifth, sixth, seventh];
    abstractChordNotes = abstractChordNotes.filter(note => Number.isInteger(note));
    
    for (let i = 0; i < abstractChordNotes.length; i++)
    {
        abstractChordNotes[i] = (abstractChordNotes[i] + 12) % 12;
    }
    
    return AbstractChord(Set(abstractChordNotes));
}
