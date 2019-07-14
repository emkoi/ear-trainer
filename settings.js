export class EarSettings
{
    constructor()
    {
        this.numChords = 4;
        this.range = {min: 'A3', max:'C5'};
        this.lowestNote = 'A3';
        this.highestNote = 'C5';
        this.chordDuration = 2; // seconds
        this.enabledChords = new Set(["I", "iii", "IV"]);
        this.chordsMustContain = new Set([0]);
        this.key = "C";
    }
}

export const DEFAULT_SETTINGS = new EarSettings();