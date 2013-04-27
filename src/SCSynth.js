// A web audio api synth
var SCSynth = cc.Class.extend({

	ctor:function () {
    	cc.log("SCSynth ctor()");
    	this.globalMediator = null;
    	this.audioContext = null;
    	this.effectChain = null;
    	this.revNode = null;
    	this.gameConfig = new SCGameConfig();
    },
    
    init:function (){
	  
	   try {
    		this.audioContext = new webkitAudioContext();
    	}
    	catch(e) {
    		alert('Web Audio API is not working. Maybe try another browser (Chrome or Safari?');
    	}  
    	
    	// Main connection point for everything
    	this.effectChain = this.audioContext.createGainNode();
    	
    	
    	//Reverb
    	this.revNode = this.audioContext.createGainNode();

    	// gain for reverb
    	this.revGain = this.audioContext.createGainNode();
    	this.revGain.gain.value = this.gameConfig.synth.voice1.effects.reverb.wetLevel;

		// gain for reverb bypass.  Balance between this and the previous = effect mix.
		this.revBypassGain = this.audioContext.createGainNode();
		this.revBypassGain.gain.value = this.gameConfig.synth.voice1.effects.reverb.dryLevel;
		
		// overall volume control node
    	this.volNode = this.audioContext.createGainNode();
    	this.volNode.gain.value = this.gameConfig.synth.voice1.defaultVolume;

    	this.effectChain.connect(this.revNode);
    	this.effectChain.connect(this.revBypassGain);
    	this.revNode.connect(this.revGain);
    	this.revGain.connect(this.volNode);
    	this.revBypassGain.connect(this.volNode);


    	// Create the filter
    	this.lowPassFilter = this.audioContext.createBiquadFilter();

   	 	// connect to output
    	this.volNode.connect(this.lowPassFilter);
    	
    	// Create the audio graph.
    	this.lowPassFilter.connect(this.audioContext.destination);
    	// Create and specify parameters for the low-pass filter.
    	this.lowPassFilter.type = this.gameConfig.synth.voice1.effects.lowPassFilter.type; // Low-pass filter. See BiquadFilterNode docs
    	this.lowPassFilter.frequency.value = this.gameConfig.synth.voice1.effects.lowPassFilter.defaultFrequency; // Set cutoff to 440 HZ
    	this.lowPassFilter.gain = this.gameConfig.synth.voice1.effects.lowPassFilter.gain;
    
    
    	// set up oscillator
    	this.source = this.audioContext.createOscillator();
	    this.source.type = this.gameConfig.synth.voice1.waveType; // type of wave. Sine, sawtooth, etc
	    this.source.envelope = this.audioContext.createGainNode();
	    this.source.connect(this.source.envelope);
	    this.source.envelope.connect(this.effectChain);
	    
	    
    },
    
    playNote:function(note){
	  
	  	// Set up envelope with Attack, Decay, Sustain and Release values/times
	    var attackTime = this.gameConfig.synth.voice1.ADSR.attackTime;
	    var decayTime = this.gameConfig.synth.voice1.ADSR.decayTime;
	    var sustainTime = this.gameConfig.synth.voice1.ADSR.sustainTime;
	    var releaseTime = this.gameConfig.synth.voice1.ADSR.releaseTime;
	    
	    var now = this.audioContext.currentTime;
	    var attackEndTime = now + (attackTime);
	    var decayEndTime = attackEndTime + decayTime;
	    var sustainEndTime = decayEndTime + sustainTime;
	    var releaseEndTime = sustainEndTime + releaseTime;

	    this.source.envelope.gain.setValueAtTime( this.gameConfig.synth.voice1.ADSR.attackStartLevel, now );
	    this.source.envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.voice1.ADSR.attackEndLevel, attackEndTime );
	   	this.source.envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.voice1.ADSR.decayLevel,  decayEndTime);
	   	this.source.envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.voice1.ADSR.sustainLevel,  sustainEndTime);
	   	this.source.envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.voice1.ADSR.releaseLevel,  releaseEndTime);


	   	cc.log("SCSynth playNote(note), note = " + note);
	   	if(note >= 0 && note <= 127){
	   			this.source.frequency.value = this.frequencyFromMidi(note);
	   		}else{
		   		this.source.frequency.value = this.frequencyFromMidi(this.gameConfig.synth.voice1.defaultFrequency);
	   	}
	   	
	    this.source.noteOn(0);
    },
    
    changeNoteFrequency:function(note){
	     	cc.log("SCSynth changeNoteFrequency(note), note = " + note);
	   	if(note >= 0 && note <= 127){
	   			this.source.frequency.value = this.frequencyFromMidi(note);
	   		}else{
		   		this.source.frequency.value = this.frequencyFromMidi(this.gameConfig.synth.voice1.defaultFrequency);
	   	}
	    
    },
    
    changeLowPassFilterFrequency:function(freq){
    		cc.log("SCSynth changeLowPassFilterFrequency() freq = " + freq);
	  		if(freq > 10 && freq < 11000){
	  			cc.log("SCSynth changeLowPassFilterFrequency() CHANGING freq = " + freq);
		  		this.lowPassFilter.frequency.value = freq;
	  		}  
	    
    },
    
    frequencyFromMidi:function(note) {
		return 440 * Math.pow(2,(note-69)/12);
	},
    
    setGlobalMediator:function(mediator){
	  	cc.log("SCLogicComponent setGlobalMediator()");
	  	
	  	if(mediator){
		  	this.globalmediator = mediator;
	  	}  
    },
    
    
        
        
        
        
    update:function (){
	    
	    
    }

});