import {Chord} from './chord.js'

export function playChord(
    audioCtx, 
    chord, 
    instrument, 
    duration = 3, 
    startTime = audioCtx.currentTime, 
    onEnded = undefined)
{
    let chordTones = makeChordAudioGraph(audioCtx, chord, instrument, audioCtx.destination);
    
    if (onEnded) chordTones[0].onended = onEnded;
    
    for (const tone of chordTones)
    {
        tone.start(startTime);
        tone.stop(startTime + duration); 
    }
}

function makeChordAudioGraph(audioCtx, chord, srcClass, destination)
{
    const numNotes = chord.notes.length;
    const noteGain = 1.0 / 4 / numNotes;
    
    let sources = new Array();
    
    for (const note of chord.notes)
    {
        let gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(noteGain, audioCtx.currentTime);
        gainNode.connect(destination);
        
        let newSrc = new srcClass(audioCtx, note.freq);
        newSrc.connect(gainNode);
        sources.push(newSrc);
    }
    
    return sources;
}

