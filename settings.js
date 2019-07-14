export class EarSettings
{
    constructor()
    {
        this.numChords = 4;
        this.lowestNote = 'C3';
        this.highestNote = 'C6';
        this.chordDuration = 2; // seconds
        this.enabledChords = ["I", "iii", "IV"];
    }
}

export const DEFAULT_SETTINGS = new EarSettings();