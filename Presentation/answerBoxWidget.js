export class AnswerBoxWidget
{
    constructor()
    {
        this.HTMLElement = document.createElement("span");
        this.HTMLElement.setAttribute("class", "answerBox");
        this.HTMLElement.onmouseover = function() 
        {
            this.HTMLElement.classList.add("mousedOverAnswerBox");
        }.bind(this);
        this.HTMLElement.onmouseout = function()
        {
            this.HTMLElement.classList.remove("mousedOverAnswerBox");
        }.bind(this);
        this.setText("?");
        this.clickedHandler = function() {};
    }
    
    setClickedHandler(handlerFn)
    {
        this.HTMLElement.onclick = handlerFn;
    }
    
    getText() 
    { 
        if (this.textContent === "?") return "";
        return this.textContent; 
    }
    setText(strText) 
    { 
        this.textContent = strText; 
        this.HTMLElement.innerHTML = strText;
    }
    
    getElement() { return this.HTMLElement; }
}