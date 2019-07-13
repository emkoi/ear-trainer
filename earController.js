import {EarModel} from './earModel.js'

// coordinates action between the app model and the passive view
export class EarController
{
    constructor(model)
    {
        this.model = model;
        this.selectedInputChordIndex = undefined;
        this._assignHandlers();
        this.accidental = 'natural';
        this.playedChords = undefined;
    }
    
    update() // called by model
    {
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
        let inputChord = this.model.inputChords[this.selectedInputChordIndex];
        if (!inputChord) return;
        
        if (this.accidental == 'natural') {}
        
        console.log("flat button clicked!");
        if (this.model.inputChords[this.selectedInputChordIndex])
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
    
    
    
    _assignHandlers()
    {
        let setHandler = (id, func) => (document.getElementById(id).onclick = func.bind(this));
        
        setHandler("flat", this.onFlatButtonClicked);
        setHandler("natural", this.onNaturalButtonClicked);
        setHandler("sharp", this.onSharpButtonClicked);
    }
}