export class SoftTriangle extends OscillatorNode
{
    constructor(audioCtx, freq)
    {
        super(audioCtx, {type:'triangle', frequency:freq});
        this.loPass = audioCtx.createBiquadFilter();
        this.loPass.type = "lowpass";
        this.loPass.frequency.setValueAtTime(freq * 5, audioCtx.currentTime);
        super.connect(this.loPass);
    }
    
    connect(arg) { this.loPass.connect(arg); }
}