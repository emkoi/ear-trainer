export class Note
{
    constructor(freq)
    {
        this.freq = freq;
    }
    
    transpose(offset)
    {
        return new Note(this.freq * Math.pow(2, offset/12));
    }
}

const NOTES = [
    new Set(["B#", "C", "Dbb"]),
    new Set(["B##", "C#", "Db"]),
    new Set(["C##", "D", "Ebb"]),
    new Set(["D#", "Eb", "Fbb"]),
    new Set(["D##", "E", "Fb"]),
    new Set(["E#", "F", "Gbb"]),
    new Set(["E##", "F#", "Gb"]),
    new Set(["F##", "G", "Abb"]),
    new Set(["G#", "Ab"]),
    new Set(["G##", "A", "Bbb"]),
    new Set(["A#", "Bb", "Cbb"]),
    new Set(["A##", "B", "Cb"])
];

export function getFreq(noteName)
{
    const noteIndex = NOTES.findIndex((set) => set.has(noteName.slice(0,-1)));
    const referenceOctave = 8;
    const C8_FREQ = 4186;
    const n8Freq = C8_FREQ * Math.pow(2, noteIndex/12);
    const octaveNum = parseInt(noteName[noteName.length - 1]);
    const octaveOffset = octaveNum - referenceOctave;
    return n8Freq * Math.pow(2, octaveOffset);
}

