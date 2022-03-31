    
export class DomainSettings
{
    constructor()
    {
        this.numChords = 9;
        this.endWith = ["I", "iii", "IM7", "vi"]; // to use chord names like this
                                        // move chordName.js and chordNameTo... to
                                        // the domain layer
        this.penultimateChord = ["V", "IV", "bvi dim7"];
        this.maxNumGuesses = 3;
    }
}