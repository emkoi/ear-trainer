import {playChord} from './playChord.js'
import {SoftTriangle} from './softTriangle.js'
import * as Chords from '../Concrete Elements/chord.js'

export class ChordProgressionPlayer
{
    constructor(audioCtx) // take a configuration later
    {
        this.audioCtx = audioCtx;
        this.playing = false;
    }
    
    playProgression(concreteProg, config = {})
    {
        if (this.playing)
        {
            console.log("can't play multiple progressions at once.");
            return;
        }
        
        this.playing = true;
        
        const DEFAULT_CHORD_DURATION = 1.5;
        let timeAccum = 0;
        
        const instrument = config.instrument || SoftTriangle;
        
        for (let i = 0; i < concreteProg.length; i++)
        {
            let duration = config.chordDuration || DEFAULT_CHORD_DURATION;
            if (config.lastChordDuration && i === concreteProg.length - 1) duration = config.lastChordDuration;
            const startTime = this.audioCtx.currentTime + timeAccum;
            
            let originalChordSustainParamValue = config.chordSustain;
            let dontSustainChord = i == concreteProg.length - 1 && config.chordSustain;
            if (dontSustainChord) config.chordSustain = false; 
            playChord(
                this.audioCtx,
                concreteProg[i],
                instrument, // this arg can be removed & passed through the config arg
                duration,  // this can't be passed through config arg
                startTime,
                config,
                i == concreteProg.length - 1 ? function onEnded() { 
                    console.log("play ended");
                    this.playing = false;
                }.bind(this) : undefined
            );
            if (dontSustainChord) config.chordSustain = originalChordSustainParamValue;
            
            timeAccum += duration;
        }
    }
}