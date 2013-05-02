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
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:true,
        showFPS:false,
        frameRate:60,
        loadExtension:false,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../cocos2d-html5/cocos2d/',
        //SingleEngineFile:'',
        appFiles:[
            'src/resource.js',
            'src/SCGameConfig.js',
            'src/SCEvent.js',
            'src/SCListener.js',
            'src/SCMediator.js',
            'src/SCBox2dLayer.js',
            'src/SCGameLayer.js',
            'src/SCSynth.js',
            'src/SCHUDLayer.js',
            'src/SCLogicComponent.js',
            'src/SCPlayerLogicComponent.js',
            'src/SCCarLogicComponent.js',
            'src/SCInputHandler.js',
            'src/SCEntity.js',
            'src/SCTimer.js',
            'src/SCScore.js',
            'src/SCCustomer.js',
            'src/SCSign.js',
            'src/SCPhysicsComponent.js',
            'src/SCPhysics.js',
            'src/SCTileMap.js',
            'src/SCCamera.js',
            'src/SCPlayerLogicComponent.js',
            'src/SCPlayer.js',
            'src/SCCar.js',
            'src/SCTMXTiledScene.js',
            'src/SCSceneManager.js',
            'src/SCGameMenu.js',
            'src/SCInstructions.js',
            'src/SCEndScene.js',
            'src/SCGameInit.js',
            'src/Box2dTest.js'
            //add  JS files in order here
        ]
    };
        window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
        //else if single file specified, load singlefile
    });
})();