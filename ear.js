import {EarModel} from './Domain/earModel.js'
import {EarView} from './Presentation/earView.js'
import {testFunc} from './testModule.js'
import {MainView} from './Presentation/mainView.js'

$(document).ready(function() { init(); });

function init()
{
    let earModel = new EarModel();
    let earViewDomElement = document.getElementById("interfaceContainer");
    //window.earView = new EarView(earViewDomElement, earModel);
    window.earView = new MainView(earViewDomElement, earModel);
    //window.earController = new EarController(earModel, earView);
}

console.log(testFunc(419));