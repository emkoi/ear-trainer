import {EarModel} from '../Domain/earModel.js'
import {makeConcreteChordProgression} from './Concrete Creation/makeConcreteChordProgression.js'
import {ChordProgressionPlayer} from './Chord Playing/chordProgressionPlayer.js'
import {getReferenceChordProgression} from './Concrete Creation/getReferenceChordProgression.js'

// projects the view model onto the screen
export class EarView
{
    constructor(domElement, model)
    {
        this.element = domElement;
        this.MAIN_INTERFACE = "/Presentation/HTML Interfaces/mainInterface.html";
        this.SETTINGS_INTERFACE = "/Presentation/HTML Interfaces/settingsInterface.html";
        
        this.model = model;
        this.model.subscribe(this);
        
        this.selectedInputChordIndex = undefined;
        this.accidental = 'natural';
        this.playedChords = undefined;
        this.chordProgPlayer = new ChordProgressionPlayer(new AudioContext()); // ideally want to pass in 
                                                            // model.getConfig().playerConfig or something
        
        // for test; otherwise should only be called through update():
        //this.initViewListeners();
        this.render(this.MAIN_INTERFACE); // ideally this will be done when the viewModel changes
        //this.doInitialPlayChords();
        this.setChordsToPlay();
    }
    
    // should be render(viewModel)?
    render(interfaceToRender)
    {
        const interfaceToLoad = encodeURI(interfaceToRender);
        
        $("#interfaceContainer").load(
            interfaceToLoad,
            function () { this.configureEventHandlers(interfaceToRender); }.bind(this)
        );
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // event handling
    
    configureEventHandlers(interfaceToRender)
    {
        if (interfaceToRender == this.MAIN_INTERFACE)
        {
            this.addEventHandler("#playButton", "click", this.onPlayButtonClicked);
            this.addEventHandler("#playReferenceButton", "click", this.onPlayReferenceButtonClicked);
            this.addEventHandler("#flat", "click", this.onFlatButtonClicked);
            this.addEventHandler("#natural", "click", this.onNaturalButtonClicked);
            this.addEventHandler("#sharp", "click", this.onSharpButtonClicked);
            this.addEventHandler("#majorI", "click", this.onIButtonClicked);
            this.addEventHandler("#majorIV", "click", this.onIVButtonClicked);
            this.addEventHandler("#minoriii", "click", this.oniiiButtonClicked);
            this.addEventHandler("#settings", "click", this.onSettingsButtonClicked);
            this.addEventHandler("#skip", "click", this.onSkipButtonClicked);
        }
        else if (interfaceToRender == this.SETTINGS_INTERFACE)
        {
            this.addEventHandler("#back", "click", this.onBackButtonClicked);
        }
    }
    
    addEventHandler(selector, event, handler)
    {
        let element = this.element.querySelector(selector);
        element.addEventListener(event, handler.bind(this));
    }
    
    onPlayButtonClicked()
    {
        console.log("Play button clicked !");
        this.playChords();
    }
    
    onPlayReferenceButtonClicked()
    {
        this.chordProgPlayer.playProgression(getReferenceChordProgression(this.model.getConfig()));
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
    
    onSettingsButtonClicked()
    {
        console.log("settings button clicked");
        this.render(this.SETTINGS_INTERFACE);
    }
    
    onBackButtonClicked()
    {
        console.log("back button clicked");
        this.render(this.MAIN_INTERFACE);
    }
    
    onSkipButtonClicked()
    {
        this.model.generateNewAnswerChords();
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // chord playing
    
    setChordsToPlay()
    {
        const abstractChordProg = this.model.getAnswerChords();
        this.playedChords = makeConcreteChordProgression(abstractChordProg, this.model.getConfig());
    }
    
    playChords()
    {
        this.chordProgPlayer.playProgression(this.playedChords, this.model.getConfig());
    }
    
    isFirstUpdateSinceChordSwitch()
    {
        return true;
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // taken from controller; needs categorization
    update() // called by model
    {
        this.setChordsToPlay();
        if (this.isFirstUpdateSinceChordSwitch()) this.playChords();
        
        // get everything from model and push to view; if better
        // performance is needed, use dirty bits
    }
}