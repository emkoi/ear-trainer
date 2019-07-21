import {Chord} from './chord.js'

export function playChord(
    audioCtx, 
    chord, 
    instrument, 
    duration = 3, 
    startTime = audioCtx.currentTime, 
    config = {},
    onEnded = undefined)
{
    const DEFAULT_ARPEGGIATION_DIRECTION = "random"
    const arpeggiationDirection = config.arpeggiationDirection || DEFAULT_ARPEGGIATION_DIRECTION;
    if (config.arpeggiationDirection == "up") 
    {
        chord.notes = chord.notes.sort((note1, note2) => (note1.freq - note2.freq));
    }
    else if (config.arpeggiationDirection == "down")
    {
        chord.notes = chord.notes.sort((note1, note2) => (note2.freq - note1.freq));
    }
    else // random
    {
        chord.notes = chord.notes.sort((note1, note2) => Math.random - 0.5);
    }
    
    let chordTones = makeChordAudioGraph(audioCtx, chord, instrument, audioCtx.destination, config);
    
    if (onEnded) chordTones[0].onended = onEnded;
    
    let endTime = startTime + duration;
    const arpeggiationDelta = config.arpeggiationTempo ?
          60 / config.arpeggiationTempo : 0;
    for (const tone of chordTones)
    {
        tone.start(startTime);
        tone.stop(endTime); 
        
        startTime = startTime + arpeggiationDelta;
        if (config.chordSustain) endTime = endTime + arpeggiationDelta;
    }
}

function makeChordAudioGraph(audioCtx, chord, srcClass, destination, config = {})
{
    const numNotes = chord.notes.length;
    let noteGain = 1.0 / 4 / numNotes**0.5;
    
    let sources = [];
    
    for (const note of chord.notes)
    {
        let gainModFactor = 1.0;
        if (config.bassBoost) 
        {
            const LOW_CUTOFF = 200;
            const HIGH_CUTOFF = 600;
            const RANGE = HIGH_CUTOFF - LOW_CUTOFF;
            const MIN_GAIN_MOD_FACTOR = 0.1;
            gainModFactor = note.freq < LOW_CUTOFF ? 1.0 :
            note.freq > HIGH_CUTOFF ? MIN_GAIN_MOD_FACTOR :
            1 - (note.freq - LOW_CUTOFF) / RANGE * (1 - MIN_GAIN_MOD_FACTOR);
        }
        let modifiedNoteGain = noteGain * gainModFactor;
        
        let gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(modifiedNoteGain, audioCtx.currentTime);
        gainNode.connect(destination);
        
        let newSrc = new srcClass(audioCtx, note.freq);
        newSrc.connect(gainNode);
        sources.push(newSrc);
    }
    
    return sources;
}

