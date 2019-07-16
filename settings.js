export class EarSettings
{
    constructor()
    {
        this.numChords = 9;
        this.range = {min: 'E3', max:'G5'};
        this.chordDuration = 2.5; // seconds
        this.lastChordDuration = 3;
        this.enabledChords = new Set(["I", "ii", "iii", "IV", "V", "vi", "viib5"]);
        this.chordsMustContain = new Set([0]);
        this.key = "C";
        this.numNotes = {min: 6, max: 6};
        this.endWith = ["I", "iii", "IM7"];
        this.penultimateChord = ["V", "IV"];
        this.arpeggiationTempo = 240;
    }
}

export const DEFAULT_SETTINGS = new EarSettings();