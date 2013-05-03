// A web audio api synth
var SCSynth = cc.Class.extend({

	ctor:function () {
    	cc.log("SCSynth ctor()");
    	this.globalMediator = null;
    	this.audioContext = null;
    	this.effectChain = null;
    	this.revNode = null;
    	this.gameConfig = new SCGameConfig();
    	this.voices = null;
    	this.voiceCounter = 0;
    	this.noteTracker = new Array();
    },
    
    init:function (){
	  
		this.audioContext = cc.Director.getInstance().audioContext;
    	
    	this.voices = new Array();
    	
    	// Main connection point for everything
    	this.effectChain = this.audioContext.createGainNode();
    	
    	
    	//Reverb
    	this.revNode = this.audioContext.createGainNode();

    	// gain for reverb
    	this.revGain = this.audioContext.createGainNode();
    	this.revGain.gain.value = this.gameConfig.synth.instrument1.effects.reverb.wetLevel;

		// gain for reverb bypass.  Balance between this and the previous = effect mix.
		this.revBypassGain = this.audioContext.createGainNode();
		this.revBypassGain.gain.value = this.gameConfig.synth.instrument1.effects.reverb.dryLevel;
		
		// overall volume control node
    	this.volNode = this.audioContext.createGainNode();
    	this.volNode.gain.value = this.gameConfig.synth.instrument1.defaultVolume;

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
    	this.lowPassFilter.type = this.gameConfig.synth.instrument1.effects.lowPassFilter.type; // Low-pass filter. See BiquadFilterNode docs
    	this.lowPassFilter.frequency.value = this.gameConfig.synth.instrument1.effects.lowPassFilter.defaultFrequency; // Set cutoff to 440 HZ
    	this.lowPassFilter.gain = this.gameConfig.synth.instrument1.effects.lowPassFilter.gain;
    
    

    		

	    
	    
    },
    
    playNote:function(note){
	  
	  	//var voiceNum = this.voiceCounter % this.gameConfig.synth.instrument1.numVoices;
	  
	  	//this.voices[voiceNum].noteOff(0)
	  	
	  	this.noteTracker.push(note);
	  	
	  	if(this.voices[note] == null){
	  		cc.log("SCSynth playNote(note) this.voices[" + note + "] == null");
		  	this.voices[note] = this.audioContext.createOscillator();
    		this.voices[note].type = this.gameConfig.synth.instrument1.waveType; // type of wave. Sine, sawtooth, etc
    		this.voices[note].envelope = this.audioContext.createGainNode();
    		this.voices[note].connect(this.voices[note].envelope);
    		this.voices[note].envelope.connect(this.effectChain);
    		this.voices[note].frequency.value = this.frequencyFromMidi(note);
		  	
	  	}else{
	  		cc.log("SCSynth playNote(note) this.voices[" + note + "] != null");
		  	//this.voices[note].noteOff(this.audioContext.currentTime - .01);
	  	}
	  
	  	// Set up envelope with Attack, Decay, Sustain and Release values/times
	    var attackTime = this.gameConfig.synth.instrument1.ADSR.attackTime;
	    var decayTime = this.gameConfig.synth.instrument1.ADSR.decayTime;
	    var sustainTime = this.gameConfig.synth.instrument1.ADSR.sustainTime;
	    var releaseTime = this.gameConfig.synth.instrument1.ADSR.releaseTime;
	    
	    var now = this.audioContext.currentTime;
	    var attackEndTime = now + (attackTime);
	    var decayEndTime = attackEndTime + decayTime;
	    var sustainEndTime = decayEndTime + sustainTime;
	    var releaseEndTime = sustainEndTime + releaseTime;

	    this.voices[note].envelope.gain.setValueAtTime( this.gameConfig.synth.instrument1.ADSR.attackStartLevel, now );
	    this.voices[note].envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.instrument1.ADSR.attackEndLevel, attackEndTime );
	   	this.voices[note].envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.instrument1.ADSR.decayLevel,  decayEndTime);
	   	this.voices[note].envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.instrument1.ADSR.sustainLevel,  sustainEndTime);
	   	this.voices[note].envelope.gain.linearRampToValueAtTime( this.gameConfig.synth.instrument1.ADSR.releaseLevel,  releaseEndTime);
	   	
	    this.voices[note].noteOn(0.01);
	    
    },
    
    changeNoteFrequency:function(note){
	     	cc.log("SCSynth changeNoteFrequency(note), note = " + note);
	     	
	     	var voiceNum = this.voiceCounter % this.gameConfig.synth.instrument1.numVoices;
	     	
	   	if(note >= 0 && note <= 127){
	   			this.voices[voiceNum].frequency.value = this.frequencyFromMidi(note);
	   		}else{
		   		this.voices[voiceNum].frequency.value = this.frequencyFromMidi(this.gameConfig.synth.instrument1.defaultFrequency);
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
    
    sendNoteGoogleEvent:function(level){
    	
    	var notes = "";
    	
    	while(this.noteTracker.length > 0){
	    	notes = notes + "note=" + this.noteTracker[0];
	    	this.noteTracker.shift();
    	}
    	
	    try{
	    	_gaq.push(['_trackEvent', 'Level Notes', 'Level = ' + level, notes]);
    	}
    	catch(e){
    		cc.log("GA Event Fail, SCSynth sendNoteGoogleEvent()");
    	}
    },
    
    destroy:function(){
		this.lowPassFilter.disconnect(0);
		this.effectChain.disconnect(0);
    	this.revNode.disconnect(0);
    	this.revGain.disconnect(0);
		this.revBypassGain.disconnect(0);;
    	this.volNode.disconnect(0);
    	this.volNode.disconnect(0);
    	for(var i = 0; i < this.voices.length; i++){
	    	if(this.voices[i]){
		    	this.voices[i].disconnect(0);
	    	}
    	}
    	//this.audioContext.destination.disconnect();
		//this.audioContext = null;
	    
    },
      
    update:function (){
	    
	    
    }

});