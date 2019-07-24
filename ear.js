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