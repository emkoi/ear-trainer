// projects the view model onto the screen
export class EarView
{
    constructor(domElement)
    {
        this.element = domElement;
    }
    
    render(viewModel)
    {
        const interfaceToLoad = "mainInterface.html";
        
        $("#interfaceContainer").load(
            interfaceToLoad,
            function () {this.configureEventHandlers()}.bind(this)
        );
    }
    
    configureEventHandlers()
    {
        this.addEventHandler("#playButton", "click", this.onPlayButtonClicked);
        this.addEventHandler("#playReferenceButton", "click", this.onPlayReferenceButtonClicked);
    }
    
    addEventHandler(selector, event, handler)
    {
        let element = this.element.querySelector(selector);
        element.addEventListener(event, handler);
    }
}