export class ChordName
{
    constructor(chordStr)
    {
        console.log("constructing ChordName with string: " + chordStr);
        
        this.prefix = "";
        this.numeral = "";
        this.suffix = "";
        
        if (chordStr)
        {
            const newChord = this.parseChord(chordStr);
            this.prefix = newChord.prefix;
            this.numeral = newChord.numeral;
            this.suffix = newChord.suffix;
        }
    }
    
    getStr()
    {
        return this.prefix + this.numeral + this.suffix;
    }
    
    // unsafe function; no bounds checking; dont use dumbly
    parseChord(chordStr)
    {
        let ret = new ChordName();
        let parseInd = 0;
        let numeralBeginIndex = 0;
        
        if (['b', '#'].includes(chordStr[parseInd]))
        {
            ret.prefix = chordStr[parseInd];
            parseInd++;
            numeralBeginIndex = parseInd;
        }
        
        while (["I", "i", "V", "v"].includes(chordStr[parseInd]))
        {
            parseInd++;
        }
        
        ret.numeral = chordStr.slice(numeralBeginIndex, parseInd);
        
        if (chordStr.length > parseInd)
        {
            ret.suffix = chordStr.slice(parseInd);
        }
        
        return ret;
    }
}