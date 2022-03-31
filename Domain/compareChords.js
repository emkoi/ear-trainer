import {AbstractChord} from './Abstract Creation/abstractChord.js'

export function isEqualChords(chord1, chord2)
{
    if (chord1.notes.size !== chord2.notes.size)
    {
        return false;
    }
    
    for (const note of chord1.notes)
    {
        if (!chord2.notes.has(note)) return false;
    }
    
    return true;
}