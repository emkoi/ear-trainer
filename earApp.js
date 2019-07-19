
// this is the Domain model; it knows nothing of any views, controllers, or view-models.
// the only thing this will do is tell the observing view-models to update,
class EarApp
{
    constructor()
    {
        this->state = new InitState;
        this->observers = [];
    }
    
    update() 
    {
        let state = this->state.update();
        if (state) this->state = state;
    }
    
    register(observer) 
    {
        this->observers.append(observer)
    }
    
    notifyStateChanged()
    {
        for (let observer of this->observers)
        {
            observer.update();
        }
    }
}

class EarAppState
{
    constructor() {}
    update() {} // returns next state or some false value if no state-change should occur
}

class InitState extends EarAppState
{
    constructor() {}
    
    update()
    {
        //return ...inputState???
    }
}

class UnansweredState extends EarAppState
{
    update() {}
}

class CorrectState extends EarAppState
{
    update() {}
}

class IncorrectState extends EarAppState
{
    update() {}
}

class ShowAnswerState extends EarAppState
{
    update() {}
}
