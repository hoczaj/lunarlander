(function ($) {
    $(document).ready(function () {


        var generatePoints = function (numberOfPoints, angleStep, roughness, totalDistance, layerHeight) {
                var hDistance = totalDistance/numberOfPoints,
                    maxAngle = roughness * 90,
                    angles = Math.floor(maxAngle / angleStep),
                    steps = [],
                    base = angles * angleStep,
                    coords = [],
                    _h = Math.floor( Math.random() * ( layerHeight - 100 ) ),
                    _w = 0;

                coords.push([_w, _h]);
                for (var i = angles * 2; i >= 0; i--) {
                    // console.log(i); // 4, 3, 2, 1, 0
                    // 0 + angles * 2 * angleStep - i*angleStem
                    steps.push( base - (i * angleStep) );
                };

                for (var i = numberOfPoints - 1; i >= 0; i--) {

                    // get random angle
                    var _index = Math.ceil(Math.random() * steps.length-1);
                    var angle = steps[_index];
                    var rad = angle * Math.PI/180;
                    var vDistance = Math.round( Math.tan(rad) * hDistance * 100 ) / 100;
                    _h += vDistance;
                    _w += hDistance;
                    var coord = [_w, _h];
                    // var coord = {
                    //     'rads': rad,
                    //     'angles': angle,
                    //     'vertical': vDistance,
                    //     'horizontal': hDistance,
                    //     'y': _h,
                    //     'x': _w
                    // };
                    coords.push(coord);
                };
                return coords;
                // console.table(coords);
                // tanA = opposite / adjacent
                // I have A, adjacent
                // opposite = tanA * adjacent
                // ajdcent = hDistance
            },
            stage = new Kinetic.Stage({
                container: 'canvas',
                width: $(window).width(),
                height: 500
            }),
            layer = new Kinetic.Layer(),
            rect = new Kinetic.Rect({
                x: 239,
                y: 75,
                width: 30,
                height: 30,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1
            }),
            circle = new Kinetic.Circle({
                x: stage.getWidth() / 4,
                y: stage.getHeight() / 4,
                radius: 70,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
            }),
            line = new Kinetic.Line({
                points: generatePoints(20, 45, 0.9, stage.getWidth(), stage.getHeight()),
                stroke: 'black',
                strokeWidth: 4,

                x: 0,
                y: 50
            }),
            timer = null,
            hVelocity = 0,
            vVelocity = 0,
            down = [];



        // add the shape to the layer
        // layer.add(rect, circle);
        layer.add(rect);
        // layer.add(circle);
        // add the layer to the stage
        layer.add(line);
        stage.add(layer);

        $(document).keydown(function(e) {
            console.log(e.which);
            down[e.keyCode] = true;
        }).keyup(function(e) {
            if (down[37] && down[38] && down[39]) {
                alert('oh hai');
            }
            down[e.keyCode] = false;
        });



        var anim = new Kinetic.Animation(function(frame) {
            vVelocity += 0.02;


            if(down['37']) {
                hVelocity -= 0.02;
            }

            if(down['39']) {
                hVelocity += 0.02;
            }

            if(down['38']) {
                vVelocity -= 0.04;
            }
            rect.move(hVelocity, vVelocity);

        }, layer);

        anim.start();

    });
}(jQuery));
