// Game Container
var SCGameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
        this.gameConfig = new SCGameConfig();
        return this;
    },
    
    
    onEnter:function () {
	    	this._super();
       		   /*var texture2 = cc.TextureCache.getInstance().addImage(s_CircleA5);
			     tempSprite = new SCNoteSprite(texture2, this.gameConfig.player.baseTextureRect);
			     
			     tempSprite.setPosition(cc.p(200,400));
			     tempSprite.playAnimation();
			     this.addChild(tempSprite, 1000, 123123);*/
    },
    
    update:function(){
	    
    }
    

});