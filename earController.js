import {EarModel} from './earModel.js'
import {makeConcreteChordProgression} from './makeConcreteChordProgression.js'
import {ChordProgressionPlayer} from './chordProgressionPlayer.js'

// coordinates action between the app model and the passive view
export class EarController
{
    constructor(model, audioCtx)
    {
        this.model = model;
        this.model.subscribe(this);
        this.selectedInputChordIndex = undefined;
        this._assignHandlers();
        this.accidental = 'natural';
        this.playedChords = undefined;
        this.audioCtx = audioCtx;
        this.chordProgPlayer = new ChordProgressionPlayer(this.audioCtx); // ideally want to pass in 
                                                            // model.getConfig().playerConfig or something
        // for test; otherwise should only be called through update():
        this.doInitialPlayChords();
    }
    
    // called every time the chord progression changes
    doInitialPlayChords()
    {
        const abstractChordProg = this.model.getAnswerChords();
        this.playedChords = makeConcreteChordProgression(abstractChordProg, this.model.getConfig());
        this.chordProgPlayer.playProgression(this.playedChords, this.model.getConfig());
    }
    
    playChords()
    {
        this.chordProgPlayer.playProgression(this.playedChords, this.model.getConfig());
    }
    
    update() // called by model
    {
        if (model.isFirstUpdateSinceChordSwitch()) this.doInitialPlayChords();
        // get everything from model and push to view; if better
        // performance is needed, use dirty bits
    }
    
    //////// Handlers /////////
    
    onPlayButtonClicked()
    {
        //const chordsPlaying = ???;
        //if (!chordsPlaying) this.playChords();
    }
    
    onFlatButtonClicked()
    {
        console.log("flat button clicked!");
        let inputChord = this.model.abstractInputChords[this.selectedInputChordIndex];
        if (!inputChord) return;
        
        if (this.accidental == 'natural') {}
        
        if (this.model.abstractInputChords[this.selectedInputChordIndex])
        {
            
        }
    }
    
    onNaturalButtonClicked()
    {
        console.log("natural button clicked!");
        this.accidental = undefined;
    }
    
    onSharpButtonClicked()
    {
        console.log("sharp button clicked");
        this.accidental = 'sharp';
    }
    
    onIButtonClicked()
    {
        console.log("I button clicked");
    }
    
    onIVButtonClicked()
    {
        console.log("IV button clicked");
    }
    
    oniiiButtonClicked()
    {
        console.log("iii button clicked");
    }
    
    
    
    _assignHandlers()
    {
        let setHandler = (id, func) => (document.getElementById(id).onclick = func.bind(this));
        
        setHandler("flat", this.onFlatButtonClicked);
        setHandler("natural", this.onNaturalButtonClicked);
        setHandler("sharp", this.onSharpButtonClicked);
        setHandler("majorI", this.onIButtonClicked);
        setHandler("majorIV", this.onIVButtonClicked);
        setHandler("minoriii", this.oniiiButtonClicked);
        setHandler("playButtonLeft", this.playChords);
    }
}