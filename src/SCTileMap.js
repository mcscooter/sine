//	Scott Cummings 2012
// 

// Tilemap that extends the functionality of the TMXTiledMap
var SCTileMap = cc.TMXTiledMap.extend({
   
   ctor:function () {	
   	this._super();
   	cc.log("SCTileMap.js ctor()");
   	// needed for JS-Bindings compatibility
    cc.associateWithNative( this, cc.TMXTiledMap );
     
   },
   
   getPointGID:function(point){
	 	var layer = this.getLayer("foreground");
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var tileX = Math.floor(point.x / tileSize.width);
    	var tileY = Math.floor(mapSize.height - point.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	var tileGID = layer.getTileGIDAt(tileCoord);
    	return(tileGID);
  
   },
   
   // recieves world point like a touch and converts it to map space (starts in TL, not BL) and returns properties
   getPointProperties:function(layerName, point){
	   	var layer = this.getLayer(layerName);
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var mapLocation = this.getPosition();
    	var tileX = Math.floor(point.x / tileSize.width);
    	var tileY = Math.floor(mapSize.height - point.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	var tileGID = layer.getTileGIDAt(tileCoord);
    	var tilePointProperties = new Object();
    	
    	tilePointProperties = this.propertiesForGID(tileGID);
    	
    	return(tilePointProperties);   
   },
   // take tile coords in world space, converts to tile space and returns properties
   getTileProperties:function(layerName, point){
	   	var layer = this.getLayer(layerName);
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var mapLocation = this.getPosition();
    	var tileX = point.x;
    	var tileY = Math.floor(mapSize.height - point.y - 1); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	var tileGID = layer.getTileGIDAt(tileCoord);
    	var tilePointProperties = new Object();
    	
    	tilePointProperties = this.propertiesForGID(tileGID);
    	//cc.log(mapSize.height / tileSize.height);
    	 //cc.log("SCTileMap getTileProperties  tileCoord.x/y properties = " + tileX + ", " + tileY + " = "); 
    	 //cc.log(this.propertiesForGID(tileGID).name);
    	
    	return(tilePointProperties);  
   },
   
   removeCustomer:function(point){
	   var layer = this.getLayer("customers");
	   layer.setTileGID(100, point); // will need to update this to make sure it's not a proper tile or o ver the limit of the sprite sheet
   },
   
   removeSign:function(point){
	   var layer = this.getLayer("signs");
	   layer.setTileGID(100, point);
	   
   },
   
   getObjectLayerProperties:function(layerName){
	   // Tiled Map Object Layer
	   var objectGroup = this.getObjectGroup(layerName).getObjects();
	   //cc.log(objectGroup);
	   
	   return objectGroup;
   }
    
});


