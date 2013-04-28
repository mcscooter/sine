// score for each round
var SCScore= SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCScore ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.score = 000;
    	this.scoreLabel = "Score ";
    	this.scoreText = cc.LabelTTF.create("000000", "Impact", 26);
    	this.scoreText.setHorizontalAlignment(this.gameConfig.score.alignment);
        this.scoreText.setColor(new cc.Color3B(255,255,255));
        this.scoreText.visible = true;
        this.scoreText.setPosition(cc.p(0, 0));
        this.addChild(this.scoreText, 99);
    },
    
    setScore:function(score){
	    this.score = score;
    },
    
    getScore:function(){
		return this.score;    
    },
    
    setFontSize:function(size){
	    this.scoreText.setFontSize(size);
    },
    
    incrementScore:function(){
	   	this.score++;  
    },
    
    setScoreLabel:function(text){
	  this.scoreLabel = text;
	    
    },
    
    

    
    update:function(dt){
    	this.timeLeft -= dt;
    	this.scoreText.setString(this.scoreLabel + (Math.ceil(this.score)));
    }

});