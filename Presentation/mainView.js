import {EarModel} from '../Domain/earModel.js'
import {makeConcreteChordProgression} from './Concrete Creation/makeConcreteChordProgression.js'
import {ChordProgressionPlayer} from './Chord Playing/chordProgressionPlayer.js'
import {getReferenceChordProgression} from './Concrete Creation/getReferenceChordProgression.js'
import {SettingsView} from './settingsView.js'
import {AnswerBoxWidget} from './answerBoxWidget.js'
import {ChordName} from './chordName.js'

// projects the model onto the screen
export class MainView
{
    constructor(domElement, model)
    {
        this.element = domElement;
        this.interfaceHTMLpath = "/Presentation/HTML Interfaces/mainInterface.html";
        
        this.model = model;
        this.model.subscribe(this);
        
        this.selectedInputChordIndex = 0;
        this.playedChords = undefined;
        this.chordProgPlayer = new ChordProgressionPlayer(new AudioContext()); // ideally want to pass in 
                                                            // model.getConfig().playerConfig or something
        
        // for test; otherwise should only be called through update():
        //this.initViewListeners();
        this.render(); // ideally this will be done when the viewModel changes
        //this.doInitialPlayChords();
        this.setChordsToPlay();
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // view interface used by model
    
    render()
    {
        const interfaceToLoad = encodeURI(this.interfaceHTMLpath);
        
        $("#interfaceContainer").load(
            interfaceToLoad,
            function () { 
                this.configureEventHandlers(); 
                this.refreshAnswerBoxes();
            }.bind(this)
        );
        
    }
    
    refreshAnswerBoxes()
    {
        $(".answerBoxes").empty();
        this.answerBoxes = [];
        const numChords = this.model.getConfig().numChords;
        for (let i = 0; i < numChords; i++)
        {
            this.answerBoxes.push(new AnswerBoxWidget());
            $(".answerBoxes").append(this.answerBoxes[i].getElement());
            this.answerBoxes[i].setClickedHandler( function() 
            {
                console.log("clicked answer box " + i);
                let box = this.answerBoxes[i];
                box.getElement().classList.add("selectedAnswerBox");
                let oldSelectedBox = this.answerBoxes[this.selectedInputChordIndex];
                if (box === oldSelectedBox) return;
                oldSelectedBox.getElement().classList.remove("selectedAnswerBox");
                this.selectedInputChordIndex = i;
            }.bind(this)
            );
        }
        this.answerBoxes[this.selectedInputChordIndex].clickedHandler();
    }
    
    update(msg)
    {
        this.setChordsToPlay();
        if (this.isFirstUpdateSinceChordSwitch()) this.playChords();
        
        // get everything from model and push to view; if better
        // performance is needed, use dirty bits
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // event handling
    
    configureEventHandlers()
    {
        this.addEventHandler("#playButton", "click", this.onPlayButtonClicked);
        this.addEventHandler("#playReferenceButton", "click", this.onPlayReferenceButtonClicked);
        
        this.addEventHandler("#flat", "click", this.onFlatButtonClicked);
        this.addEventHandler("#natural", "click", this.onNaturalButtonClicked);
        this.addEventHandler("#sharp", "click", this.onSharpButtonClicked);
        
        this.addEventHandler("#majorI", "click", this.onIButtonClicked);
        this.addEventHandler("#majorII", "click", this.onIIButtonClicked);
        this.addEventHandler("#majorIII", "click", this.onIIIButtonClicked);
        this.addEventHandler("#majorIV", "click", this.onIVButtonClicked);
        this.addEventHandler("#majorV", "click", this.onVButtonClicked);
        this.addEventHandler("#majorVI", "click", this.onVIButtonClicked);
        this.addEventHandler("#majorVII", "click", this.onVIIButtonClicked);
        this.addEventHandler("#minori", "click", this.oniButtonClicked);
        this.addEventHandler("#minorii", "click", this.oniiButtonClicked);
        this.addEventHandler("#minoriii", "click", this.oniiiButtonClicked);
        this.addEventHandler("#minoriv", "click", this.onivButtonClicked);
        this.addEventHandler("#minorv", "click", this.onvButtonClicked);
        this.addEventHandler("#minorvi", "click", this.onviButtonClicked);
        this.addEventHandler("#minorvii", "click", this.onviiButtonClicked);
        
        this.addEventHandler("#dominant", "click", this.on7ButtonClicked);
        this.addEventHandler("#major7", "click", this.onM7ButtonClicked);
        this.addEventHandler("#sevenFlat5", "click", this.on7b5ButtonClicked);
        this.addEventHandler("#dim7", "click", this.onDim7ButtonClicked);
        this.addEventHandler("#aug7", "click", this.onAug7ButtonClicked);
        this.addEventHandler("#augMaj7", "click", this.onAugM7ButtonClicked);
        this.addEventHandler("#minMaj7", "click", this.onMinMaj7ButtonClicked);
        
        this.addEventHandler("#phrygian", "click", this.onPhrygButtonClicked);
        this.addEventHandler("#sus2", "click", this.onSus2ButtonClicked);
        this.addEventHandler("#sus4", "click", this.onSus4ButtonClicked);
        this.addEventHandler("#lydian", "click", this.onLydButtonClicked);
        this.addEventHandler("#dim", "click", this.onDimButtonClicked);
        this.addEventHandler("#aug", "click", this.onAugButtonClicked);
        this.addEventHandler("#flat5", "click", this.onb5ButtonClicked);
        
        this.addEventHandler("#settings", "click", this.onSettingsButtonClicked);
        this.addEventHandler("#skip", "click", this.onSkipButtonClicked);
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
        // write to the model later (make a translator from ChordName to the type of abstractInputChords)
        //let inputChord = this.model.abstractInputChords[this.selectedInputChordIndex];\
        this.changeCurrentPrefix('b');
    }
    
    onNaturalButtonClicked()
    {
        console.log("natural button clicked!");
        this.changeCurrentPrefix('');
    }
    
    onSharpButtonClicked()
    {
        console.log("sharp button clicked");
        this.changeCurrentPrefix('#');
    }
    
    onIButtonClicked()
    {
        console.log("I button clicked");
        this.changeCurrentNumeral("I");
    }
    
    onIIButtonClicked()
    {
        console.log("II button clicked");
        this.changeCurrentNumeral("II");
    }
    
    onIIIButtonClicked()
    {
        console.log("III button clicked");
        this.changeCurrentNumeral("III");
    }
    
    onIVButtonClicked()
    {
        console.log("IV button clicked");
        this.changeCurrentNumeral("IV");
    }
    
    onVButtonClicked()
    {
        console.log("V button clicked");
        this.changeCurrentNumeral("V");
    }
    
    onVIButtonClicked()
    {
        console.log("VI button clicked");
        this.changeCurrentNumeral("VI");
    }
    
    onVIIButtonClicked()
    {
        console.log("VII button clicked");
        this.changeCurrentNumeral("VII");
    }
    
    oniButtonClicked()
    {
        console.log("i button clicked");
        this.changeCurrentNumeral("i");
    }
    
    oniiButtonClicked()
    {
        console.log("ii button clicked");
        this.changeCurrentNumeral("ii");
    }
    
    oniiiButtonClicked()
    {
        console.log("iii button clicked");
        this.changeCurrentNumeral("iii");
    }
    
    onivButtonClicked()
    {
        console.log("iv button clicked");
        this.changeCurrentNumeral("iv");
    }
    
    onvButtonClicked()
    {
        console.log("v button clicked");
        this.changeCurrentNumeral("v");
    }
    
    onviButtonClicked()
    {
        console.log("vi button clicked");
        this.changeCurrentNumeral("vi");
    }
    
    onviiButtonClicked()
    {
        console.log("vii button clicked");
        this.changeCurrentNumeral("vii");
    }
    
    on7ButtonClicked()
    {
        console.log("7 button clicked");
        this.changeCurrentSuffix("7");
    }
    
    onM7ButtonClicked()
    {
        console.log("M7 button clicked");
        this.changeCurrentSuffix("M7");
    }
    
    on7b5ButtonClicked()
    {
        console.log("7b5 button clicked");
        this.changeCurrentSuffix("7b5");
    }
    
    onDim7ButtonClicked()
    {
        console.log("dim7 button clicked");
        this.changeCurrentSuffix("dim7");
    }
    
    onAug7ButtonClicked()
    {
        console.log("+7 button clicked");
        this.changeCurrentSuffix("+7");
    }
    
    onAugM7ButtonClicked()
    {
        console.log("+M7 button clicked");
        this.changeCurrentSuffix("+M7");
    }
    
    onMinMaj7ButtonClicked()
    {
        console.log("m/M7 button clicked");
        this.changeCurrentSuffix("m/M7");
    }
    
    onPhrygButtonClicked()
    {
        console.log("Phryg button clicked");
        this.changeCurrentSuffix(" Phryg");
    }
    
    onSus2ButtonClicked()
    {
        console.log("sus2 button clicked");
        this.changeCurrentSuffix("sus2");
    }
    
    onSus4ButtonClicked()
    {
        console.log("sus4 button clicked");
        this.changeCurrentSuffix("sus4");
    }
    
    onLydButtonClicked()
    {
        console.log("Lyd button clicked");
        this.changeCurrentSuffix(" Lyd");
    }
    
    onDimButtonClicked()
    {
        console.log("dim button clicked");
        this.changeCurrentSuffix("dim");
    }
    
    onAugButtonClicked()
    {
        console.log("+ button clicked");
        this.changeCurrentSuffix("+");
    }
    
    onb5ButtonClicked()
    {
        console.log("b5 button clicked");
        this.changeCurrentSuffix("b5");
    }
    
    changeCurrentNumeral(numeralStr)
    {
        this.changeCurrentChord("numeral", numeralStr);
    }
    
    changeCurrentPrefix(prefixStr)
    {
        this.changeCurrentChord("prefix", prefixStr);
    }
    
    changeCurrentSuffix(suffixStr)
    {
        this.changeCurrentChord("suffix", suffixStr);
    }
    
    changeCurrentChord(property, str)
    {
        let selectedBox = this.answerBoxes[this.selectedInputChordIndex];
        let currentText = selectedBox.getText();
        let currentChordName = new ChordName(currentText);
        currentChordName[property] = str;
        selectedBox.setText(currentChordName.getStr());
    }
    
    onSettingsButtonClicked()
    {
        console.log("settings button clicked");
        // tell model to render the settings interface
        //this.render(this.SETTINGS_INTERFACE);
        window.earView = new SettingsView(this.element, this.model);
    }
    
    onSkipButtonClicked()
    {
        this.model.generateNewAnswerChords();
    }
    
    onShowAnswerClicked()
    {
        
    }
    
    onSubmitClicked()
    {
        let guessedChords = [];
        for (let i = 0; i < this.model.getConfig().numChords; i++)
        {
            let answerText = this.answerBoxes[i].getText();
            if (!answerText)
            {
                console.log("didn't guess chord " + i);
                break;
            }
            let parsedChord = ChordName.parseChord(answerText);
            let abstractChord = chordNameToAbstractChord(parsedChord);
            guessedChords.append(abstractChord);
        }
        
        this.model.submitGuessedAnswerChords(guessedChords);
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
}