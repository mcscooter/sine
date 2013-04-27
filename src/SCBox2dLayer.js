// Box2D Physics Container
// Scott Cummings, 2013
// 

/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var SCBox2dLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
        this.gameConfig = new SCGameConfig();        
    },
    
    init:function(){
        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
            , b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

        var screenSize = cc.Director.getInstance().getWinSize();

        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(this.gameConfig.Box2dLayer.gravityX, this.gameConfig.Box2dLayer.gravityY), true);
        this.world.SetContinuousPhysics(true);


        // listen for beginning of all body collisions
        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function(contact) {
         	cc.log("BOX2D Collision Contact Listener = ");
         	cc.log(contact.GetFixtureA().GetBody().GetUserData());
         }
         this.world.SetContactListener(listener);
       
        // this is the test graphic for 
        var mgr = cc.SpriteBatchNode.create(s_pathBlock, 150);
        this.addChild(mgr, 0, TAG_SPRITE_MANAGER);

        //Set up sprite for testing adding a sprite attached to a BOX2D shape (square for now)
        this.addNewSpriteWithCoords(cc.p(screenSize.width / 2, screenSize.height / 2));
        
        
        // add a physics debug draw visualization in a seperate canvas
        if(this.gameConfig.Box2dLayer.debugDraw == true){
        	// attempt to draw debug using another canvas
        	var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("boxCanvas").getContext("2d"));
			debugDraw.SetDrawScale(this.gameConfig.Box2dLayer.PTM_RATIO);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugDraw);
		}
        cc.log("Box2DTest Finished CTOR");
    },

    addNewSpriteWithCoords:function (p) {
        //UXLog(L"Add sprite %0.2f x %02.f",p.x,p.y);
        var batch = this.getChildByTag(TAG_SPRITE_MANAGER);
        // correct for world movement
        p.x = p.x - this.getPosition().x;
        p.y = p.y - this.getPosition().y;
        cc.log("addNewSpriteWithCoords:function (p) p.x/y = " + p.x + " " + p.y);
        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        var idx = (Math.random() > .5 ? 0 : 1);
        var idy = (Math.random() > .5 ? 0 : 1);
        var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.rect(32 * idx, 32 * idy, 32, 32));
        // scott, trying to add a name fo ID
        sprite.SCName = "testName from Scott";
        batch.addChild(sprite);

        sprite.setPosition(cc.p(p.x, p.y));

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / this.gameConfig.Box2dLayer.PTM_RATIO, p.y / this.gameConfig.Box2dLayer.PTM_RATIO);
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);

    },
    
        addNewEntity:function (p, newEntity) {
        //UXLog(L"Add sprite %0.2f x %02.f",p.x,p.y);
        //var batch = this.getChildByTag(TAG_SPRITE_MANAGER);
        // correct for world movement
        p.x = p.x - this.getPosition().x;
        p.y = p.y - this.getPosition().y;
        //cc.log("addNewSpriteWithCoordsNew:function (p) p.x/y = " + p.x + " " + p.y);
        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        //var idx = (Math.random() > .5 ? 0 : 1);
        //var idy = (Math.random() > .5 ? 0 : 1);
        //var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.rect(32 * idx, 32 * idy, 32, 32));
        // scott, trying to add a name fo ID
        //sprite.SCName = "testName from Scott";
        //batch.addChild(sprite);

        newEntity.setPosition(cc.p(p.x, p.y));
        this.addChild(newEntity, 100, newEntity.getID());

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / this.gameConfig.Box2dLayer.PTM_RATIO, p.y / this.gameConfig.Box2dLayer.PTM_RATIO);
        bodyDef.userData = newEntity;
        var body = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);

    },
    
    update:function (dt) {
        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/
        
        var b2Vec2 = Box2D.Common.Math.b2Vec2;

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                // if it is the player -- needs to be moved to player entity
                if(myActor.ID && myActor.ID == this.gameConfig.globals.TAG_PLAYER){
                	
                	b.SetAwake(true);
                	b.SetAngle(0);
                	b.SetAngularVelocity(0);
                	
                	if(myActor.state && myActor.state.movementDirection){
                		cc.log("SCBox2DLayer update() myActor.state.movementDirection = " + myActor.state.movementDirection);
                		if(myActor.state.movementDirection == "up"){
	                		cc.log("SCBox2DLayer update() myActor.state.movementDirection == \"up\"");
	                		var force = new b2Vec2(0,10);
	                		b.SetAwake(true);
	                		b.SetLinearVelocity(force);
	                	
	                	}
	                	if(myActor.state.movementDirection == "right"){
	                		cc.log("SCBox2DLayer update() myActor.state.movementDirection == \"right\"");
	                		var force = new b2Vec2(10,0);
	                		b.SetAwake(true);
	                		b.SetLinearVelocity(force);
	                	
	                	}
	                	if(myActor.state.movementDirection == "left"){
	                		cc.log("SCBox2DLayer update() myActor.state.movementDirection == \"left\"");
	                		var force = new b2Vec2(-10,0);
	                		b.SetAwake(true);
	                		b.SetLinearVelocity(force);
	                	
	                	}
	                	if(myActor.state.movementDirection == "down"){
	                		cc.log("SCBox2DLayer update() myActor.state.movementDirection == \"down\"");
	                		var force = new b2Vec2(0,-10);
	                		b.SetAwake(true);
	                		b.SetLinearVelocity(force);
	                	
	                	}
	                }
	             }
	            myActor.setPosition(cc.p(b.GetPosition().x * this.gameConfig.Box2dLayer.PTM_RATIO, b.GetPosition().y * this.gameConfig.Box2dLayer.PTM_RATIO));
                myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
            }
        }
        
        if(this.gameConfig.Box2dLayer.debugDraw == true){
         	this.world.DrawDebugData();
         }
         //this.setPosition(cc.p(this.getPosition().x + .3, this.getPosition().y + .3));
         //this.world.position.Set(2,2);

    }
    /* enable to draw physics shapes on CC2D Canvas. Doesn't work correctly in CC2D currently (cc2D HTML5 2.1)
    draw:function (ctx) {
    	this.world.DrawDebugData();
        this._super(ctx);
    },
    */
    
    

});