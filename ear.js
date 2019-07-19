import {testFunc} from './testModule.js';
import {SoftTriangle} from './softTriangle.js'
import {playChord} from './playChord.js'
import * as Chords from './chord.js'
import {EarController} from './earController.js'
import {EarModel} from './earModel.js'
import {EarView} from './earView.js'

let audioContext = new AudioContext();

window.addEventListener("load", init, false);
function init()
{
    let earModel = new EarModel();
    let earView = new EarView(document);
    // the controller should instantiate the audioContext ideally, but it is
    // still needed in this file temporarily
    window.earController = new EarController(earModel, earView, audioContext);
}

console.log(testFunc(419));

//window.addEventListener("load", initPlayButton, false); // hopefully this is synchronous
function initPlayButton()
{
    const playButton = document.querySelector("#playButton");
    
    // soon this will be moved to the view
    playButton.addEventListener(
        "click", 
        function()
        {
            if (playButton.dataset.playing === "false")
            {
                
                console.log(Chords.C_MINOR);
                
                playButton.dataset.playing = "true";
                
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(7),
                    SoftTriangle,
                    2.4, 
                    audioContext.currentTime
                );
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(0),
                    SoftTriangle,
                    2.4, 
                    audioContext.currentTime
                );
                
                
                playChord(
                    audioContext,
                    Chords.C_MAJOR.transpose(-2),
                    SoftTriangle,
                    1.2,
                    audioContext.currentTime + 2.4
                );
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(5),
                    SoftTriangle,
                    1.2, 
                    audioContext.currentTime + 2.4
                );
                
                
                playChord(
                    audioContext,
                    Chords.C_MAJOR.transpose(-2),
                    SoftTriangle,
                    0.6, 
                    audioContext.currentTime + 3.6
                );
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(7),
                    SoftTriangle,
                    0.6, 
                    audioContext.currentTime + 3.6
                );
                
                
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(7),
                    SoftTriangle,
                    2.4, 
                    audioContext.currentTime + 4.8
                );
                playChord(
                    audioContext,
                    Chords.C_MINOR.transpose(0),
                    SoftTriangle,
                    2.4, 
                    audioContext.currentTime + 4.8,
                    function() { 
                        console.log("play ended");
                        playButton.dataset.playing = "false";
                    }
                );
            }
        }, 
        false
    );
}