//	Scott Cummings 2012
//

var SCEnd = cc.Layer.extend({
    isMouseDown:false,

    init:function () {
    	
    	this.gameConfig = new SCGameConfig();
    	
        cc.log("SCEndScene.js init()");
        
        this._super();
        var selfPointer = this;
        var size = cc.Director.getInstance().getWinSize();
        this.setTouchEnabled(true);
   
        var level = cc.Director.getInstance().gameConfig.sessionData.level;
   
        cc.Director.getInstance().gameConfig.sessionData.level = 1;
   
   
        
   
        var background = new cc.Sprite(this.gameConfig.gameEndScene.backgroundTexture);     
    	background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    	this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
      
    	// add round score and best score
    	this.score = new SCScore();
        this.score.setPosition(this.gameConfig.gameEndScene.totalScorePosition);
       	this.score.setScoreLabel("Score   ");
       	this.score.setFontSize(48);
        this.score.setScore(cc.Director.getInstance().gameConfig.sessionData.score);
       	this.addChild(this.score, 96, this.gameConfig.globals.TAG_SCORE);
       	this.score.update();
       	
       	this.bestScore = new SCScore();
        this.bestScore.setPosition(this.gameConfig.gameEndScene.bestScorePosition);
       	this.bestScore.setScoreLabel("Best Score   ");
       	this.bestScore.setFontSize(48);
        if(cc.Director.getInstance().gameConfig.sessionData.score < cc.Director.getInstance().gameConfig.sessionData.bestScore){
        		 cc.Director.getInstance().gameConfig.sessionData.bestScore =  cc.Director.getInstance().gameConfig.sessionData.score
        	}
        this.bestScore.setScore(cc.Director.getInstance().gameConfig.sessionData.bestScore);
       	this.addChild(this.bestScore, 96, this.gameConfig.globals.TAG_BEST_SCORE);
       	this.bestScore.update();
                
        return true;
    },
    
    // Handle touch and mouse events
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                
            }
        }
    },
    onTouchesEnded:function (touches, event) {
    
    	cc.Director.getInstance().gameConfig.sessionData.score = 0;
        this.isMouseDown = false;
        var director = cc.Director.getInstance();
        //cc.AnimationCache.purgeSharedAnimationCache();
        //cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        //cc.TextureCache.purgeSharedTextureCache();
        //director.purgeDirector();
        director.replaceScene(new Level1);
    },
    onTouchesCancelled:function (touches, event) {
    }
});


var SCEndScene = cc.Scene.extend({

    onEnter:function () {
	    this._super();
	   layer = new SCEnd();
	   layer.init();
        this.addChild(layer); 
    },
    
    init:function(nextScene){   
      
    }
});

