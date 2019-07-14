import {playChord} from './playChord.js'
import {SoftTriangle} from './softTriangle.js'
import * as Chords from './chord.js'

export class ChordProgressionPlayer
{
    constructor(audioCtx) // take a configuration later
    {
        this.audioCtx = audioCtx;
    }
    
    playProgression(concreteProg)
    {
        const CHORD_DURATION = 2.4;
        for (let i = 0; i < concreteProg.length; i++)
        {
            playChord(
                this.audioCtx,
                concreteProg[i],
                SoftTriangle,
                CHORD_DURATION, 
                this.audioCtx.currentTime + i*CHORD_DURATION
            );
        }
    }
}