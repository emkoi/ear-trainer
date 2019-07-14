export class EarSettings
{
    constructor()
    {
        this.numChords = 8;
        this.range = {min: 'G3', max:'E5'};
        this.chordDuration = 1.5; // seconds
        this.enabledChords = new Set(["I", "ii", "iii", "IV", "V"]);
        this.chordsMustContain = new Set([0]);
        this.key = "C";
        this.numNotes = {min: 3, max: 4};
    }
}

export const DEFAULT_SETTINGS = new EarSettings();