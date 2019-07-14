export class EarSettings
{
    constructor()
    {
        this.numChords = 9;
        this.range = {min: 'G3', max:'E5'};
        this.chordDuration = 1.5; // seconds
        this.lastChordDuration = 3;
        this.enabledChords = new Set(["I", "ii", "iii", "IV", "V", "vi", "viib5"]);
        this.chordsMustContain = new Set([0]);
        this.key = "C";
        this.numNotes = {min: 3, max: 4};
        this.endWith = ["I", "iii"];
        this.penultimateChord = ["V", "IV"];
        
    }
}

export const DEFAULT_SETTINGS = new EarSettings();