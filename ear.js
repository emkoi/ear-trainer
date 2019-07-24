import {EarController} from './Presentation/earController.js'
import {EarModel} from './Domain/earModel.js'
import {EarView} from './Presentation/earView.js'
import {testFunc} from './testModule.js'

$(document).ready(function() { init(); });

function init()
{
    let earModel = new EarModel();
    let earView = new EarView(document.getElementById("interfaceContainer"));
    window.earController = new EarController(earModel, earView);
}

console.log(testFunc(419));