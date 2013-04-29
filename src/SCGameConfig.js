//	Scott Cummings 2012
// 

// Some items are defined in cocos2d.js due to their being needed before SCGameConfig.js is loaded. These are:
//	  COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
//        box2d:BOOL,
//        showFPS:BOOL,
//        frameRate:INT,
//        loadExtension:BOOL,
//        tag:STRING,
//        engineDir:STRING


var SCGameConfig = cc.Class.extend({
   
   ctor:function (filename) {
   		
   		var mapSize = cc.Director.getInstance().getWinSize();
   		//cc.log(mapSize.width + mapSize.height);
   		
   		this.player = {
   						
   						"carRight":cc.TextureCache.getInstance().addImage(s_CarRight),
   						"carLeft":cc.TextureCache.getInstance().addImage(s_CarLeft),
   						"carUp":cc.TextureCache.getInstance().addImage(s_CarUp),
   						"carDown":cc.TextureCache.getInstance().addImage(s_CarDown),
   						"ball":cc.TextureCache.getInstance().addImage(s_Ball),
   						"baseTextureRect":cc.rect(0, 0, 32, 32),
   						"startPosition":cc.p(80, 236),
   						"hitbox":cc.rect(-14,-14,28,28),
   						"centerOffset":cc.p(16,16),
   						"baseSpeed":1,
   						"maxVelocity":7,
   						"baseAccelleration":1,
   						"startingMovementDirection":null,
   						"startingRenderDirection":"right",
   						"rotatePhysics":false
   					};
   					
   		this.greenCar = {
   						
   						"greenCarRight":cc.TextureCache.getInstance().addImage(s_GreenCarRight),
   						"greenCarLeft":cc.TextureCache.getInstance().addImage(s_GreenCarLeft),
   						"greenCarUp":cc.TextureCache.getInstance().addImage(s_GreenCarUp),
   						"greenCarDown":cc.TextureCache.getInstance().addImage(s_GreenCarDown),
   						"baseTextureRect":cc.rect(0, 0, 32, 32),
   						"startPosition":cc.p(272, 224),
   						"hitbox":cc.rect(-14,-14,28,28),
   						"centerOffset":cc.p(16,16),
   						"baseSpeed":5,
   						"maxVelocity":6,
   						"baseAccelleration":.1,
   						"startingDirection":null
   					};
   
   
   		this.maps = {
	   					level1:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth1.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(116, 208)
	   						
	   						
	   						
	   					},
	   					level2:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth2.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(116, 240)
	   					},
	   					level3:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth3.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(86, 90)
	   					},
	   					level4:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth4.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(112, 310)
	   					},
	   					level5:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth5.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(492, 304)
	   					},
	   					level6:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth6.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(682, 332)
	   					},
	   					level7:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth7.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(118, 208)
	   					},
	   					level8:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth8.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(240, 208)
	   					},
	   					level9:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth9.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(206, 240)
	   					},
	   					level10:{ 	
	   						//"filename":"res/tilemaps/test-tilemap.tmx",
	   						"filename":"res/tilemaps/synth10.tmx",
	   						"position":cc.p(0,0),
	   						"ballStart":cc.p(116, 208)
	   					}
   					};
   					
   		this.sessionData = {
	   					"score":0,
	   					"level":1,
	   					"bestScore":9999999999
	   				};
   					
   		this.Box2dLayer = {
	   					"position":cc.p(0,0),
	   					"debugDraw":true,
	   					"PTM_RATIO":32,//point to meter ratio for Box2D
	   					"gravityX":0,
	   					"gravityY":0,
	   					"physicsWindowMargin":cc.p(50,50),
	   					tileBox:{ 	
	   						"diameter":.5,
	   						"center":.5, // anchor is in middle, this is corrected for in SCBox2DLayer
	   						"density":1.0,
	   						"friction":0.5,
	   						"restitution":0.2
	   					}
	   					
	   		
   		};
   					
   		this.globals = {
   						
	   					"MSG_LAYER_TOUCHED" :1,
						"MSG_PLAYER_MOVED":2,
						"MSG_MAP_TOUCHED":3,
						"MSG_INPUT_CHANGED":4,
						"MSG_TIME_OVER":5,
						"MSG_END_LEVEL":6,
						"TAG_TILE_MAP":1, 
						"TAG_MEDIATOR":2,
						"TAG_PLAYER":3,
						"TAG_CAMERA":4,
						"TAG_TIMER":5,
						"TAG_TIMER_TEXT":6,
						"TAG_HUDLAYER":7,
						"TAG_SCORE":8,
						"TAG_CUSTOMER":9,
						"TAG_SIGN":10,
						"TAG_GAME_LAYER":11,
						"TAG_MENU_BACKGROUND":12,
						"TAG_MENU_TITLE":13,
						"TAG_CAR_ENTITY":14,
						"TAG_BOX2D_LAYER":15,
						"TAG_SPRITE_MANAGER":16,
						"TAG_BOX2D_STATIC":17,
						"TAG_TOTAL_SCORE":18,
						"TAG_BEST_SCORE":19
   		};
   		
   		this.timer = {	
	   					"timeLimit":130,
	   					"position":cc.p(740,440),
	   					"fontSize":18	
   					};
   					
   		this.score = {	
	   					"position":cc.p(100,424),
	   					"alignment":cc.TEXT_ALIGNMENT_LEFT
   					};
   					
   		this.totalScore = {	
	   					"position":cc.p(700,424),
	   					"alignment":cc.TEXT_ALIGNMENT_RIGHT
   					};
   					
   					
   					
   		this.customer = {	
	   					"position":cc.p(740,10)
   					};
   		this.sign = {	
	   					"position":cc.p(20,10)
   					};
   					
   		this.gameMenuScene = {	
	   					"backgroundTexture":cc.TextureCache.getInstance().addImage(s_MenuBG),
	   					"backgroundTextureRect":cc.rect(0, 0, 800, 450),
	   					"backgroundPosition":cc.p(400,225),
	   					"titleTexture":cc.TextureCache.getInstance().addImage(s_MenuTitle),
	   					"titlePosition":cc.p(400,250),
	   					"menuPosition":cc.p(400,100)
   					};
   					
   		this.gameInstructionsScene = {	
	   					"backgroundTexture":cc.TextureCache.getInstance().addImage(s_instructionBG),
	   					"backgroundTextureRect":cc.rect(0, 0, 800, 450),
	   					"backgroundPosition":cc.p(400,225),
	   					"totalScorePosition":cc.p(400,230),
	   					"bestScorePosition":cc.p(400,140)	
   					};
   					
   		this.gameEndScene = {	
	   					"backgroundTexture":cc.TextureCache.getInstance().addImage(s_endTempBG),
	   					"backgroundTextureRect":cc.rect(0, 0, 800, 450),
	   					"backgroundPosition":cc.p(400,225),
	   					"totalScorePosition":cc.p(400,230),
	   					"bestScorePosition":cc.p(400,140)	
   					};

   					
   		this.debug = {	
	   					"drawHitboxes":false	
   					};
   					
   		this.settings = {
	   		
	   					"SCPhysics":false,
	   					"Box2DPhysics":true
   					};
   					
   					
   		this.synth = {
	   					instrument1:{ 
	   						
	   						"waveType":0, // 0=sine, 1=square, 2=saw, 3=triangle, 4=custom (must give it a wave table)
	   						"defaultFrequency":60, // MIDI value, middle C
	   						"defaultVolume":.7,
	   						"numVoices":6,
	   						
	   						ADSR:{	
	   							"attackTime":.01,
	   							"decayTime":.03,
	   							"sustainTime":.2,
	   							"releaseTime":.02,
	   							"attackStartLevel":0,
	   							"attackEndLevel":1,
	   							"decayLevel":.6,
	   							"sustainLevel":.5,
	   							"releaseLevel":0
	   						},
	   						
	   						effects:{
		   						reverb:{
		   							"wetLevel":0,
		   							"dryLevel":1
			   						
		   						},
		   						lowPassFilter:{
			   						"defaultFrequency":440,
			   						"type":0,
			   						"gain":1
			   						
		   						}
	   						}
	   					
	   						
	   						
	   					}
   					};
   					
   					
   		// needed for JS-Bindings compatibility
   		cc.associateWithNative( this, cc.Class );
   }
    
});