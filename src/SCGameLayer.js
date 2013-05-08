// Game Container
var SCGameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
        this.gameConfig = new SCGameConfig();
        return this;
    },
    
    
    onEnter:function () {
	    	this._super();
    },
    
    update:function(){
	    
    }
    

});