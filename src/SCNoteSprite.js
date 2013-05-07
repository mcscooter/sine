//	Scott Cummings 2012
// 
var SCNoteSprite = SCEntity.extend({
   
   ctor:function (filename) {
   		this._super(filename);
   		this.gameConfig = new SCGameConfig();
   		
    	
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


   playAnimation:function(){
	   	  var animation = cc.Animation.create();
	   	  var frameName = "res/images/entities/circle/circle-a-1.png";
	   	  var frameName2 = "res/images/entities/circle/circle-a-2.png";
	   	  animation.addSpriteFrameWithFile(frameName);
	   	  animation.addSpriteFrameWithFile(frameName2);
	   	  animation.setDelayPerUnit(1);
	   	  animation.setRestoreOriginalFrame(true);
	   	  var action = cc.Animate.create(animation);
	   	  var texture2 = cc.TextureCache.getInstance().addImage(s_Circle);

	   	  this.runAction(action);
   }
   
    
});


