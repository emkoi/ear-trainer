export class EarView
{
    constructor(domElement)
    {
        this.element = domElement;
    }
    
    render(viewModel)
    {
        // write to element
        // this.element.innerHTML = ...;
        
        // this.whatevers to update internal state from vm
        
        this.configureEventHandlers();
    }
    
    configureEventHandlers()
    {
        this.addEventHandler("#playButton", "click", this.onPlayButtonClicked);
    }
    
    addEventHandler(selector, event, handler)
    {
        let element = this.element.querySelector(selector);
        element.addEventListener(event, handler);
    }
}