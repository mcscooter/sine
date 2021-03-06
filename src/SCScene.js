
// an array of the entities in the game
var entities = new Array();
var physicsEntities = new Array();

var SCLayer = cc.Layer.extend({
	
	ctor:function () {
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        this.gameConfig = new SCGameConfig();
    },

    // run when SCTileLayer is created
    onEnter:function () {

    	this._super();
    	// gets the size of the game. In points, not pixels.
    	var s = cc.Director.getInstance().getWinSize();
    	    	
    	// A layer for the moving graphics that is seperate from the HUD
    	this.gameLayer = new SCGameLayer();
    	this.gameLayer.setPosition(cc.p(0,0));
    	this.addChild(this.gameLayer, 1, this.gameConfig.globals.TAG_GAME_LAYER);
    	
    	// A layer for the HUD
    	this.HUDLayer = new SCHUDLayer();
    	this.HUDLayer.setPosition(cc.p(0,0));
    	this.addChild(this.HUDLayer, 999, this.gameConfig.globals.TAG_HUDLAYER);
    	
    	
        // Make a physics layer
        var physicsLayer = new SCBox2dLayer();
        physicsLayer.init();
        physicsLayer.setPosition(this.gameConfig.Box2dLayer.position);
        this.gameLayer.addChild(physicsLayer, 1000, this.gameConfig.globals.TAG_BOX2D_LAYER);
       
       
       
        // set up the listener and messaging mediator
       	this.mediator = new SCMediator();
       	
       	// handles keyboard input, will move touch to this eventually
       	this.inputHandler = new SCInputHandler();
       	
       	// add the physics engine
       	// this.physics = new SCPhysics();
       	
       	// determines what we see on the stage
       	camera = new SCCamera();
       	camera.setView(this.gameLayer);
       	this.gameLayer.addChild(camera, -1000, this.gameConfig.globals.TAG_CAMERA);
       
    	// Make a player entity
    	// Since SCPlayer extends a CCSprite (SCEntity), we start with a texture. Could be a 1px transparent image if an invisible sprite is needed.
        var player = new SCPlayer(this.gameConfig.player.carRight, this.gameConfig.player.baseTextureRect);     
    	player.setPosition(this.gameConfig.player.startPosition);
    	player.setID(this.gameConfig.globals.TAG_PLAYER);
    	entities.push(player);
    	physicsEntities.push(player);
    	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).addNewEntity(cc.p(192,300),player);
    	//this.gameLayer.addChild(player, 99, this.gameConfig.globals.TAG_PLAYER);
       	//physicsLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(this.gameConfig.player.startPosition);
       	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(this.gameConfig.player.startPosition);
       	
       	// Make a car entity
    	// Since SCCar extends a CCSprite (SCEntity), we start with a texture. Could be a 1px transparent image if an invisible sprite is needed.
        var carEntity = new SCCar(this.gameConfig.greenCar.greenCarRight, this.gameConfig.greenCar.baseTextureRect);     
    	carEntity.setPosition(this.gameConfig.greenCar.startPosition);
    	carEntity.setID(this.gameConfig.globals.TAG_CAR_ENTITY);
    	entities.push(carEntity);
    	physicsEntities.push(carEntity);
    	//this.gameLayer.addChild(carEntity, 100, this.gameConfig.globals.TAG_CAR_ENTITY);
    	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).addNewEntity(cc.p(200,200),carEntity);
       	
       	this.timer = new SCTimer();
       	this.timer.setPosition(this.gameConfig.timer.position);
       	entities.push(this.timer);
       	this.HUDLayer.addChild(this.timer, 95, this.gameConfig.globals.TAG_TIMER);
       	
       	this.score = new SCScore();
       	this.score.setPosition(this.gameConfig.score.position);
        entities.push(this.score);
       	this.HUDLayer.addChild(this.score, 96, this.gameConfig.globals.TAG_SCORE);
       	
       	this.customer = new SCCustomer();
       	this.customer.setPosition(this.gameConfig.customer.position);
        entities.push(this.customer);
       	this.HUDLayer.addChild(this.customer, 96, this.gameConfig.globals.TAG_CUSTOMER);
       	
       	
       	this.sign = new SCSign();
       	this.sign.setPosition(this.gameConfig.sign.position);
        entities.push(this.sign);
       	this.HUDLayer.addChild(this.sign, 96, this.gameConfig.globals.TAG_PRICE);

     	
       	var inputHandlerStateEventCallback = function(args){player.inputChanged(args);};
       	var inputHandleStateEvent = new SCEvent(this.gameConfig.globals.MSG_INPUT_CHANGED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	var inputHandlerStateEventListener = new SCListener(inputHandleStateEvent, inputHandlerStateEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	this.mediator.register(inputHandlerStateEventListener);
     	
     	// set all hitboxes to draw or not.
     	this.setEntityDrawHitboxes(this.gameConfig.debug.drawHitboxes);
     	
     	// set the global event message mediator object on entities
     	this.setEntityGlobalMediator(this.mediator);
     	
     	// set the mediator in components
     	this.setComponentGlobalMediator(this.mediator);
     	
     	// test Web Audio API
     	//this.testWebAudioSynth();
     	
     	this.synth = new SCSynth();
     	this.synth.init();
     	
        // update each frame
       	this.scheduleUpdate();
       	
     
       		
    },
    
    setEntityGlobalMediator:function(mediator){
	    if(mediator){
		    for( var i = 0; i < entities.length; i++ ){
			    entities[i].setGlobalMediator(mediator);
		    }
	    }else{
		    cc.log("SCTMXTiledScene setEntityGlobalMediator mediator is null");
	    }
	    
    },
    
    setComponentGlobalMediator:function(mediator){
	  this.inputHandler.setGlobalMediator(mediator);      
    },
   
    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {
	    this.synth.playNote(Math.abs(Math.floor(touch.getLocation().y / cc.Director.getInstance().getWinSize().height * 127)));
	    this.synth.changeLowPassFilterFrequency(Math.abs(Math.floor(touch.getLocation().x / cc.Director.getInstance().getWinSize().width * 12000)));
        return true; // set this if you want to claim the touch
    },
    
    
    // Handles touch up and mouse up
    onTouchEnded:function (touch, event) {
    	
    	// Get touch info 
    	var touchLocation = touch.getLocation();	
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
	     this.synth.changeNoteFrequency(Math.abs(Math.floor(touch.getLocation().y / cc.Director.getInstance().getWinSize().height * 127)));
	     this.synth.changeLowPassFilterFrequency(Math.abs(Math.floor(touch.getLocation().x / cc.Director.getInstance().getWinSize().width * 12000)));
    },
    
    // Keyboard handling
    onKeyUp:function(e){ 	
	    this.inputHandler.keyUp(e);
    },
    onKeyDown:function(e){
    	this.inputHandler.keyDown(e);   
    },
    
    // test the Web Audio API synth functionality
    testWebAudioSynth:function (){
	  cc.log("SCTMXTiledScene.js testWebAudioSynth()");  
	  
	  try {
    		myAudioContext = new webkitAudioContext();
    	}
    	catch(e) {
    		alert('Web Audio API is not supported! Try Chrome browser!!!');
    	}
	    
	// Try setting up an effects chain    
	// connection point for all voices
	effectChain = myAudioContext.createGainNode();

	//Reverb
    revNode = myAudioContext.createGainNode();

    // gain for reverb
	revGain = myAudioContext.createGainNode();
	revGain.gain.value = 0.1;

	// gain for reverb bypass.  Balance between this and the previous = effect mix.
	revBypassGain = myAudioContext.createGainNode();

	// overall volume control node
    volNode = myAudioContext.createGainNode();
    volNode.gain.value = 0.25;

    effectChain.connect( revNode );
    effectChain.connect( revBypassGain );
    revNode.connect( revGain );
    revGain.connect( volNode );
    revBypassGain.connect( volNode );

    // hook it up to the "speakers"
    volNode.connect( myAudioContext.destination );
    
    
    
    // test oscillator
    	var source = myAudioContext.createOscillator();
	    source.type = 0; // sine wave
	    source.envelope = myAudioContext.createGain();
	    source.connect(source.envelope);
	    source.envelope.connect(effectChain);
	    
	    // This is the "initial patch" of the ADSR settings.  YMMV.
	    var currentEnvA = 1;
	    var currentEnvD = 1;
	    var currentEnvS = 10;
	    var currentEnvR = 10;
	    
	    // set up the volume ADSR envelope
	    var now = myAudioContext.currentTime;
	    var envAttackEnd = now + (currentEnvA/10.0);

	    source.envelope.gain.setValueAtTime( 0.0, now );
	    source.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
	    source.envelope.gain.setTargetValueAtTime( (currentEnvS/100.0), envAttackEnd, (currentEnvD/100.0)+0.001 );

	    source.noteOn(0);
	    
    },
    
    // make a player, initialize, add to layer
    initPlayer:function (){

    	
    	// test animaiton on player
    	var actionTo = cc.MoveTo.create(5, cc.p(1024, 32));
        this.player.runAction(actionTo);
    },
    
    updateInputState:function (){
       
    },
    
    updateLogic:function(){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateLogic();
		}
    },
    
    updatePhysics:function (dt){
    
    },
    
    
    updateRender:function (){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateRender();
		}
		this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA).update(); // probably should change to gameLayer.update()
    },
    
    updateHUD:function(dt){  
      	this.timer.update(dt);
	    this.score.update();
	    this.customer.update();
	    this.sign.update();
    },
    
    //callback for the time being over
    timeOver:function(args){
	  	cc.log("SCTMXTiledScene timeOver()");  
    },
    
    // update every frame of the game
    update:function (dt) {
    	//cc.log("this.gameLayer.position = " + this.gameLayer.getPosition().x + " " + this.gameLayer.getPosition().y);
	    this.updateInputState();
	    this.mediator.update();
	    this.updateLogic();
	    this.updatePhysics(dt);
	    this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).update(dt);
	    this.updateRender();
	    this.updateHUD(dt);
      },
    
    setEntityDrawHitboxes:function(drawHitboxes){
	    for(var i=0; i<entities.length; i++){
		    entities[i].drawHitbox = drawHitboxes;
	    }
    }

    
});

var Level1 = SCLayer.extend({
    ctor:function () {
        this._super();
    }

});

