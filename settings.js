export class EarSettings
{
    constructor()
    {
        this.numChords = 4;
        this.lowestNote = 'C3';
        this.highestNote = 'C6';
        this.chordDuration = 2; // seconds
        this.enabledChords = ["i", "IV", "V"];
    }
}

export const DEFAULT_SETTINGS = new EarSettings();