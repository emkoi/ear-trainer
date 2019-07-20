export class EarSettings
{
    constructor()
    {
        this.numChords = 9;
        this.range = {min: 'C0', max:'G7'};
        this.chordDuration = 3.5; // seconds
        this.lastChordDuration = 2 * this.chordDuration;
        this.enabledChords = new Set(["I", "ii", "iii", "IV", "V", "vi", "viib5"]);
        this.chordsMustContain = new Set([0]);
        this.key = "C";
        this.numNotes = {min: 16, max: 16};
        this.endWith = ["I", "iii", "IM7"];
        this.penultimateChord = ["V", "IV"];
        this.arpeggiationTempo = 400;
        this.arpeggiationDirection = "up";
        this.bassBoost = true;
        this.chordSustain = true;
    }
}

export const DEFAULT_SETTINGS = new EarSettings();