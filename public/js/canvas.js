
/*!
 *   Main Web Application canvas - js
 *   Author: brazhnikov vasya
 *   Website: Almsaeed Studio <http://.io>
 *   License: Open source - MIT
 *   Please visit http://opensource.org/licenses/MIT for more information
 */
$('document').ready( function(){

    if( !$('#canvas').length > 0 ) {
        return false;
    }

    var app = new PIXI.Application(800, 600, { antialias: true });
    document.getElementById('canvas').appendChild(app.view);

    var treangle = new PIXI.Graphics();
    treangle.beginFill(0xFF3300);
    treangle.lineStyle(4, 0xffd900, 1);
    treangle.moveTo(50,50);
    treangle.lineTo(250, 50);
    treangle.lineTo(100, 100);
    treangle.lineTo(50, 50);
    treangle.position.x = 100;
    treangle.position.y = 100;
    treangle.endFill();
    app.stage.addChild(treangle);

    var rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2, 0xFF00FF, 1);
    rectangle.beginFill(0xFF00BB, 0.25);
    rectangle.drawRect(-50, -100, 50, 200);
    rectangle.position.x = 100;
    rectangle.position.y = 500;
    rectangle.pivot.set(0,0);
    rectangle.endFill();
    app.stage.addChild(rectangle);


    // draw a circle
    var circle = new PIXI.Graphics();
    circle.lineStyle(0);
    circle.beginFill(0x3399FF, 1);
    circle.position.x = 650;
    circle.position.y = 100;
    circle.pivot.set(0,0);
    circle.drawCircle(-50, -50, 100);
    app.stage.addChild(circle);


    // draw a diamond (a square rotated to stand on one corner).
    var diamond = new PIXI.Graphics();
    diamond.lineStyle(0, 0xFFFF66, 0.5);
    diamond.beginFill(0xFFFF66, 0.5);
    diamond.drawRect(-50, -50, 100, 100);
    diamond.pivot.set(0,0);
    diamond.rotation = 3.14159;
        // This defines the center.
    diamond.position.x = 650;
    diamond.position.y = 500;

    app.stage.addChild(diamond);

    app.ticker.add(function() {
        // just for fun, let's rotate mr rabbit a little
        diamond.rotation += 0.01;
        rectangle.rotation += 0.01; 
        circle.rotation += 0.01; 
        treangle.rotation += 0.01; 
    });
});