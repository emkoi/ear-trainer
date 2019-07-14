import {playChord} from './playChord.js'
import {SoftTriangle} from './softTriangle.js'
import * as Chords from './chord.js'

export class ChordProgressionPlayer
{
    constructor(audioCtx) // take a configuration later
    {
        this.audioCtx = audioCtx;
    }
    
    playProgression(concreteProg, config = {})
    {
        const DEFAULT_CHORD_DURATION = config.chordDuration;
        let timeAccum = 0;
        
        for (let i = 0; i < concreteProg.length; i++)
        {
            let duration = DEFAULT_CHORD_DURATION;
            if (config.lastChordDuration && i === concreteProg.length - 1) duration = config.lastChordDuration;
            
            playChord(
                this.audioCtx,
                concreteProg[i],
                SoftTriangle,
                duration, 
                this.audioCtx.currentTime + timeAccum
            );
            
            timeAccum += duration;
        }
    }
}