//	Scott Cummings 2012
// 
var SCNoteSprite = SCEntity.extend({
   
   ctor:function (filename) {
   		this._super(filename);
   		this.gameConfig = new SCGameConfig();
   		this.animation = null;
   		this.animationAction = null;
    	return this;
   },
   
   setGlobalMediator:function(mediator){
   		this._super(mediator);
   		this.logicComponent.setGlobalMediator(this.globalMediator)
   },

   // put any special canvas drawing you might need in here. Hitbox is drawn on Entity
   draw:function (){
   		this._super();
   },
   
   // create one set of animation to play for the Entity to play
   makeAnimations:function(animType){
	   	
	   	
	   	this.animation = cc.Animation.create();
	   	  var frameName1 = "res/images/entities/circle/circle-a-1.png";
	   	  var frameName2 = "res/images/entities/circle/circle-a-2.png";
	   	  var frameName3 = "res/images/entities/circle/circle-a-3.png";
	   	  var frameName4 = "res/images/entities/circle/circle-a-4.png";
	   	  var frameName5 = "res/images/entities/circle/circle-a-5.png";
	   	  var frameName6 = "res/images/entities/circle/circle-a-6.png";
	   	  var frameName7 = "res/images/entities/circle/circle-a-7.png";
	   	  this.animation.addSpriteFrameWithFile(frameName1);
	   	  this.animation.addSpriteFrameWithFile(frameName2);
	   	  this.animation.addSpriteFrameWithFile(frameName3);
	   	  this.animation.addSpriteFrameWithFile(frameName4);
	   	  this.animation.addSpriteFrameWithFile(frameName5);
	   	  this.animation.addSpriteFrameWithFile(frameName6);
	   	  this.animation.addSpriteFrameWithFile(frameName7);
	   	  
	   	  this.animation.setDelayPerUnit(.03);
	   	  this.animation.setRestoreOriginalFrame(true);
	   	  this.action = cc.Animate.create(this.animation);
	   	  //var texture2 = cc.TextureCache.getInstance().addImage(s_Circle);
	   	  //this.runAction(this.action);
	   	
	   	
/*
        var frameName1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("circle-a-1.png");
        var frameName2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("circle-a-2.png");
        
        this.animation = cc.Animation.create();
        this.animation.addSpriteFrame(frameName1);
	   	this.animation.addSpriteFrame(frameName2);
	   	
	   	this.animation.setDelayPerUnit(.03);
	   	this.animation.setRestoreOriginalFrame(true);
	   	this.action = cc.Animate.create(this.animation);
	   	//var texture2 = cc.TextureCache.getInstance().addImage(s_Circle);

	   	//this.runAction(this.action);
	   	*/

   },
   


   playAnimation:function(){
	   	 /*
	   	  var animation = cc.Animation.create();
	   	  var frameName1 = "res/images/entities/circle/circle-a-1.png";
	   	  var frameName2 = "res/images/entities/circle/circle-a-2.png";
	   	  var frameName3 = "res/images/entities/circle/circle-a-3.png";
	   	  var frameName4 = "res/images/entities/circle/circle-a-4.png";
	   	  var frameName5 = "res/images/entities/circle/circle-a-5.png";
	   	  var frameName6 = "res/images/entities/circle/circle-a-6.png";
	   	  var frameName7 = "res/images/entities/circle/circle-a-7.png";
	   	  animation.addSpriteFrameWithFile(frameName1);
	   	  animation.addSpriteFrameWithFile(frameName2);
	   	  animation.addSpriteFrameWithFile(frameName3);
	   	  animation.addSpriteFrameWithFile(frameName4);
	   	  animation.addSpriteFrameWithFile(frameName5);
	   	  animation.addSpriteFrameWithFile(frameName6);
	   	  animation.addSpriteFrameWithFile(frameName7);
	   	  
	   	  animation.setDelayPerUnit(.03);
	   	  animation.setRestoreOriginalFrame(true);
	   	  var action = cc.Animate.create(animation);
	   	  var texture2 = cc.TextureCache.getInstance().addImage(s_Circle);
	   	  this.runAction(action);
	   	  */
	   	  this.runAction(this.action);
   }
   
    
});


