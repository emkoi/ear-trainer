import {EarModel} from '../Domain/earModel.js'
import {makeConcreteChordProgression} from './Concrete Creation/makeConcreteChordProgression.js'
import {ChordProgressionPlayer} from './Chord Playing/chordProgressionPlayer.js'
import {getReferenceChordProgression} from './Concrete Creation/getReferenceChordProgression.js'
import {MainView} from './mainView.js'

// projects the view model onto the screen
export class SettingsView
{
    constructor(domElement, model)
    {
        this.element = domElement;
        this.SETTINGS_INTERFACE = "/Presentation/HTML Interfaces/settingsInterface.html";
        
        this.model = model;
        this.model.subscribe(this);
        
        // for test; otherwise should only be called through update():
        //this.initViewListeners();
        this.render(); // ideally this will be done when the viewModel changes
    }
    
    // should be render(viewModel)?
    render()
    {
        const interfaceToLoad = encodeURI(this.SETTINGS_INTERFACE);
        
        $("#interfaceContainer").load(
            interfaceToLoad,
            function () { this.configureEventHandlers(); }.bind(this)
        );
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // event handling
    
    configureEventHandlers()
    {
        this.addEventHandler("#back", "click", this.onBackButtonClicked);
    }
    
    addEventHandler(selector, event, handler)
    {
        let element = this.element.querySelector(selector);
        element.addEventListener(event, handler.bind(this));
    }
    
    onBackButtonClicked()
    {
        console.log("back button clicked");
        window.earView = new MainView(this.element, this.model);
        // use model to load the main interface
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // taken from controller; needs categorization
    update() // called by model
    {
        // get everything from model and push to view; if better
        // performance is needed, use dirty bits
    }
}