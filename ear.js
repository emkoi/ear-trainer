import {testFunc} from './testModule.js';
import {SoftTriangle} from './softTriangle.js'
import {playChord} from './playChord.js'
import * as Chords from './chord.js'
import {EarController} from './earController.js'
import {EarModel} from './earModel.js'
import {EarView} from './earView.js'

//window.addEventListener("load", init, false);

$(document).ready(function() { init(); });

function init()
{
    let earModel = new EarModel();
    let earView = new EarView(document.getElementById("interfaceContainer"));
    window.earController = new EarController(earModel, earView);
}

console.log(testFunc(419));