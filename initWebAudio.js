window.addEventListener("load", init, false);
function init()
{
    try
    {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
        console.log("Web audio API is supported in this browser");
    }
    catch (err)
    {
        console.log("Web audio API is not supported in this browser");   
    }
}