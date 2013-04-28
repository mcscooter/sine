
// an array of the entities in the game
var entities = new Array();
var physicsEntities = new Array();

var SCTileLayer = cc.Layer.extend({
	
	_map:null,
	ctor:function () {
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        this.gameConfig = new SCGameConfig();
        this.iosSoundInitialized = false;
        this.levelNumber = 1;
    },
    
    // run when SCTileLayer is created
    onEnter:function () {

    	this._super();
    	// gets the size of the game. In points, not pixels.
    	var s = cc.Director.getInstance().getWinSize();
    	    	
    	// set up the listener and messaging mediator
       	this.mediator = new SCMediator();
    	    	
    	// A layer for the moving graphics that is seperate from the HUD
    	this.gameLayer = new SCGameLayer();
    	this.gameLayer.setPosition(cc.p(0,0));
    	this.addChild(this.gameLayer, 1, this.gameConfig.globals.TAG_GAME_LAYER);
    	
    	// A layer for the HUD
    	this.HUDLayer = new SCHUDLayer();
    	this.HUDLayer.setPosition(cc.p(0,0));
    	this.addChild(this.HUDLayer, 999, this.gameConfig.globals.TAG_HUDLAYER);
    	
    	this.score = new SCScore();
    	this.totalScore = new SCScore();
    	
    	var tileMap = this.loadTileMap();
    	this.gameLayer.addChild(tileMap, 0, this.gameConfig.globals.TAG_TILE_MAP);
    	
       
       // Make the custom web audio synth class
       //this.synth = cc.Director.getInstance().synth;
       this.synth = new SCSynth();
       this.synth.init();
       
       
        // Make a physics layer
        var physicsLayer = new SCBox2dLayer();
        physicsLayer.initWithMap(tileMap, this.synth, this.mediator, this, this.score, this.totalScore);
        physicsLayer.setPosition(this.gameConfig.Box2dLayer.position);
        this.gameLayer.addChild(physicsLayer, 1000, this.gameConfig.globals.TAG_BOX2D_LAYER);
       
       	
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
    	var texture = cc.TextureCache.getInstance().addImage(s_Ball);
        //var player = new SCPlayer(this.gameConfig.player.carRight, this.gameConfig.player.baseTextureRect);     
        var player = new SCPlayer(texture, this.gameConfig.player.baseTextureRect);     
    	player.setPosition(this.getPlayerLevelStart());
    	player.setID(this.gameConfig.globals.TAG_PLAYER);
    	entities.push(player);
    	//physicsEntities.push(player);
    	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).addNewEntity(this.gameConfig.player.startPosition,player);
    	//this.gameLayer.addChild(player, 99, this.gameConfig.globals.TAG_PLAYER);
       	//physicsLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(this.gameConfig.player.startPosition);
       	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(this.gameConfig.player.startPosition);
       	
       	/*
       	// Make a car entity
    	// Since SCCar extends a CCSprite (SCEntity), we start with a texture. Could be a 1px transparent image if an invisible sprite is needed.
        var carEntity = new SCCar(this.gameConfig.greenCar.greenCarRight, this.gameConfig.greenCar.baseTextureRect);     
    	carEntity.setPosition(this.gameConfig.greenCar.startPosition);
    	carEntity.setID(this.gameConfig.globals.TAG_CAR_ENTITY);
    	entities.push(carEntity);
    	physicsEntities.push(carEntity);
    	//this.gameLayer.addChild(carEntity, 100, this.gameConfig.globals.TAG_CAR_ENTITY);
    	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).addNewEntity(cc.p(200,200),carEntity);
       	*/
       	
       	
       	//this.timer = new SCTimer();
       	//this.timer.setPosition(this.gameConfig.timer.position);
       //	entities.push(this.timer);
       	//this.HUDLayer.addChild(this.timer, 95, this.gameConfig.globals.TAG_TIMER);
       	
       	
       	this.score.setPosition(this.gameConfig.score.position);
       	this.score.setScoreLabel("Level Score ");
        entities.push(this.score);
       	this.HUDLayer.addChild(this.score, 96, this.gameConfig.globals.TAG_SCORE);
       	
       	
       	this.totalScore.setPosition(this.gameConfig.totalScore.position);
       	this.totalScore.setScore(cc.Director.getInstance().gameConfig.sessionData.score);
       	this.totalScore.setScoreLabel("Total Score ");
       	entities.push(this.totalScore);
       	this.HUDLayer.addChild(this.totalScore, 96, this.gameConfig.globals.TAG_TOTAL_SCORE);
       	
       	/*
       	this.customer = new SCCustomer();
       	this.customer.setPosition(this.gameConfig.customer.position);
        entities.push(this.customer);
       	this.HUDLayer.addChild(this.customer, 96, this.gameConfig.globals.TAG_CUSTOMER);
       	
       	
       	this.sign = new SCSign();
       	this.sign.setPosition(this.gameConfig.sign.position);
        entities.push(this.sign);
       	this.HUDLayer.addChild(this.sign, 96, this.gameConfig.globals.TAG_PRICE);
       	*/
       
    /*
       	// Register callbacks
     	var mapTouchEventCallback = function(testArg){player.mapTouched(testArg);};
       	var mapTouchEvent = new SCEvent(this.gameConfig.globals.MSG_MAP_TOUCHED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP));
       //	var mapTouchListener = new SCListener(mapTouchEvent, mapTouchEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	var mapTouchListener = new SCListener(mapTouchEvent, mapTouchEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	this.mediator.register(mapTouchListener);
     	
     	
     	var playerMovedCameraCallback = function(testArg){camera.playerMoved(testArg);};
       	var playerMovedCameraEvent = new SCEvent(this.gameConfig.globals.MSG_PLAYER_MOVED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA));
       	var playerMovedCameraListener = new SCListener(playerMovedCameraEvent, playerMovedCameraCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA));
       //	this.mediator.register(playerMovedCameraListener); // turn back on to have camera move
       	*/
       	var inputHandlerStateEventCallback = function(args){player.inputChanged(args);};
       	var inputHandleStateEvent = new SCEvent(this.gameConfig.globals.MSG_INPUT_CHANGED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	var inputHandlerStateEventListener = new SCListener(inputHandleStateEvent, inputHandlerStateEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	this.mediator.register(inputHandlerStateEventListener);
       	
       	
       	
       	
       	/*
       	var endLevelCallback = function(args){this.endLevel(args);};
       	var endLevelEvent = new SCEvent(this.gameConfig.globals.MSG_END_LEVEL, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LEVEL));
       	var endLevelEventListener = new SCListener(endLevelEvent, endLevelCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER));
       	this.mediator.register(endLevelEventListener);
       	*/
     	
     	// set all hitboxes to draw or not.
     	this.setEntityDrawHitboxes(this.gameConfig.debug.drawHitboxes);
     	
     	// set the global event message mediator object on entities
     	this.setEntityGlobalMediator(this.mediator);
     	
     	// set the mediator in components
     	this.setComponentGlobalMediator(this.mediator);
     	
    
     	
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
    	if(this.iosSoundInitialized == false){
	    	//this.synth.playNote(Math.abs(Math.floor(touch.getLocation().y / cc.Director.getInstance().getWinSize().height * 40 + 10)));
	    	this.synth.changeLowPassFilterFrequency(Math.abs(Math.floor(touch.getLocation().x / cc.Director.getInstance().getWinSize().width * 12000)));
	    	this.iosSoundInitialized = true;
	    	}
        return true; // set this if you want to claim the touch
    },
    
    
    // Handles touch up and mouse up
    onTouchEnded:function (touch, event) {
    	
    	// Get touch info and map info
    	var touchLocation = touch.getLocation();
    	var tileMap = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    	var layer = tileMap.getLayer("foreground");
    	var tileSize = tileMap.getTileSize();
    	var mapSize = tileMap.getMapSize();
    	var mapLocation = tileMap.getPosition();
    	var mapTouchLocation = tileMap.convertTouchToNodeSpace(touch);
    	var tileTouchedX = Math.floor(mapTouchLocation.x / tileSize.width);
    	var tileTouchedY = Math.floor(mapSize.height - mapTouchLocation.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileTouchedX, tileTouchedY);
    	
    	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).shoot(touchLocation, this.gameConfig.player.startPosition);	
    
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
	    // this.synth.changeNoteFrequency(Math.abs(Math.floor(touch.getLocation().y / cc.Director.getInstance().getWinSize().height * 127)));
	    // this.synth.changeLowPassFilterFrequency(Math.abs(Math.floor(touch.getLocation().x / cc.Director.getInstance().getWinSize().width * 12000)));
    },
    
    // Keyboard handling
    onKeyUp:function(e){ 	
	    this.inputHandler.keyUp(e);
    },
    onKeyDown:function(e){
    	this.inputHandler.keyDown(e);   
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
	    
	    if(this.gameConfig.settings.SCPhysics == true){
	    	for( var i = 0; i < physicsEntities.length; i++ ){
	    		if(physicsEntities[i].physicsComponent){
					physicsEntities[i].updatePhysics(dt, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP), physicsEntities);
					}else{cc.log("SCTMXTiledScene updatePhysics entity with ------ NO ------ physics component.");}
				}
		}
    },
    
    
    updateRender:function (){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateRender();
		}
		this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA).update(); // probably should change to gameLayer.update()
    },
    
    updateHUD:function(dt){  
      	//this.timer.update(dt);
	    this.score.update();
	    this.totalScore.update();
	    //this.customer.update();
	    //this.sign.update();
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
      
   endLevel:function(args){
	    cc.log("SCTMXTiledScene endLevel()");
	    //var director = cc.Director.getInstance();
	    	//director.replaceScene(new Level1);
	    this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP).removeChild();
	    this.gameLayer.removeChild(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP));
	   // this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER).removeChild();
	   // this.gameLayer.removeChild(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_BOX2D_LAYER));
	   
	   //this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).removeChild();
	   //this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).visible = false;
	  // this.gameLayer.removeChildByTag(this.gameConfig.globals.TAG_PLAYER, true);
	   //this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(cc.p(0,0));
	   
	   /*
	    if(this.levelNumber == 1){
		    this.loadLevel2();
	    }
	    */
	    
	    this.synth.destroy();
	    
	    var level = cc.Director.getInstance().gameConfig.sessionData.level;
	    
	    if(level < 2){
        	var director = cc.Director.getInstance();
        	cc.Director.getInstance().gameConfig.sessionData.level += 1;
        	cc.Director.getInstance().gameConfig.sessionData.score = this.totalScore.getScore();
        	cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
        	cc.AnimationCache.purgeSharedAnimationCache();
        	cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        	cc.TextureCache.purgeSharedTextureCache();
        	director.replaceScene(new Level1);
        }else{
	        var director = cc.Director.getInstance();
        	cc.Director.getInstance().gameConfig.sessionData.level += 1;
        	cc.Director.getInstance().gameConfig.sessionData.score = this.totalScore.getScore();
        	cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
        	cc.AnimationCache.purgeSharedAnimationCache();
        	cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        	cc.TextureCache.purgeSharedTextureCache();
        	director.replaceScene(new SCEndScene);

	        
        }

	    
	    
    },
    
    loadTileMap:function(){
	    cc.log("SCTMXTiledScene loadTileMap()");
	    
	    var level = cc.Director.getInstance().gameConfig.sessionData.level;
	    
	    // Make a map from a Tiled map file. If there are problems here check the compression on the file from within Tiled.
    	var tileMap = new SCTileMap();
	    
	    if(level == 1){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level1.filename);
		   tileMap.setPosition(this.gameConfig.maps.level1.position); 
		   return tileMap;   
	    }
	    
	    if(level == 2){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level2.filename);
		   tileMap.setPosition(this.gameConfig.maps.level2.position); 
		   return tileMap;   
	    }
	    
	     if(level == 3){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level3.filename);
		   tileMap.setPosition(this.gameConfig.maps.level3.position); 
		   return tileMap;   
	    }
	    
	     if(level == 4){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level4.filename);
		   tileMap.setPosition(this.gameConfig.maps.level4.position); 
		   return tileMap;   
	    }
	    
	     if(level == 5){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level5.filename);
		   tileMap.setPosition(this.gameConfig.maps.level5.position); 
		   return tileMap;   
	    }
	    
	     if(level == 6){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level6.filename);
		   tileMap.setPosition(this.gameConfig.maps.level6.position); 
		   return tileMap;   
	    }
	    
	     if(level == 7){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level7.filename);
		   tileMap.setPosition(this.gameConfig.maps.level7.position); 
		   return tileMap;   
	    }
	    
	     if(level == 8){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level8.filename);
		   tileMap.setPosition(this.gameConfig.maps.level8.position); 
		   return tileMap;   
	    }
	    
	     if(level == 9){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level9.filename);
		   tileMap.setPosition(this.gameConfig.maps.level9.position); 
		   return tileMap;   
	    }
	    
	     if(level == 10){
		   tileMap.initWithTMXFile(this.gameConfig.maps.level10.filename);
		   tileMap.setPosition(this.gameConfig.maps.level10.position); 
		   return tileMap;   
	    }
	    
    },
    
    getPlayerLevelStart:function(){
	    cc.log("SCTMXTiledScene getPlayerLevelStart()");
	    
	    var level = cc.Director.getInstance().gameConfig.sessionData.level;
	    
	    if(level == 1){
		   return this.gameConfig.maps.level1.ballStart;   
	    }
	    
	    if(level == 2){
  
		   return this.gameConfig.maps.level2.ballStart;    
	    }
	    
	     if(level == 3){ 
		     return this.gameConfig.maps.level3.ballStart;     
	    }
	    
	     if(level == 4){ 
		   return this.gameConfig.maps.level4.ballStart;  
	    }
	    
	     if(level == 5){   
		   return this.gameConfig.maps.level5.ballStart;  
	    }
	    
	     if(level == 6){  
		   return this.gameConfig.maps.level6.ballStart;     
	    }
	    
	     if(level == 7){
		   return this.gameConfig.maps.level7.ballStart;  
	    }
	    
	     if(level == 8){
		     return this.gameConfig.maps.level8.ballStart;  
	    }
	    
	     if(level == 9){
		     return this.gameConfig.maps.level9.ballStart;  
	    }
	    
	     if(level == 10){
		     return this.gameConfig.maps.level10.ballStart;  
	    }
	    
    },
    
    setEntityDrawHitboxes:function(drawHitboxes){
	    for(var i=0; i<entities.length; i++){
		    entities[i].drawHitbox = drawHitboxes;
	    }
    }

    
});

// Use this to create different levels / areas on a map
var Level1 = SCTileLayer.extend({
    ctor:function () {
        this._super();
    },
    
    // not currently used. fix this up to make it easy to launch any level
    initWithLevelName:function (levelName) {
        var map = new SCTileMap();
        map.initWithTMXFile(levelName);
        map.setPosition(cc.p(0,0));
        this.addChild(map, 0, this.gameConfig.globals.TAG_TILE_MAP);
        
	    
    }

});

