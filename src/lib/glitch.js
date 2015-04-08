'use strict';

/*
 * ImageGlitcher by Felix Turner - http://www.airtight.cc
 * Image processing via BitmapData.js - http://peternitsch.net/bitmapdata.js/
 */

var BitmapData = require('BitmapData.js');

var _glitchAmount = 5;
var _brightnessAmount = 5;
var _canvas;
var _context;
var _inputImage;
var _useScanLines = true;
var _imageLoaded = false;
var _iw;
var _ih;

var glitch = function(){

    var start = new Date().getTime();

    //draw input image to output canvas
    var outputBMD = new BitmapData(_iw, _ih);
    outputBMD.draw(_inputImage);

    //init inputBMD
    var inputBMD = new BitmapData(_iw, _ih);
    inputBMD.draw(_inputImage);
    var maxOffset = _glitchAmount * _glitchAmount / 100 * _iw;

    //randomly offset slices horizontally
    for (var i = 0; i < _glitchAmount * 2; i++) {

	var startY = getRandInt(0, _ih);
	var chunkHeight = getRandInt(1, _ih / 4);
	chunkHeight = Math.min(chunkHeight, _ih - startY);
	var offset = getRandInt(-maxOffset, maxOffset);

	if (offset == 0)
	    continue;

	if (offset < 0) {
	    //shift left
	    outputBMD.copyPixels(inputBMD, new Rectangle(-offset, startY,
                                                         _iw + offset,
                                                         chunkHeight),
                                 new Point(0, startY));
	    //wrap around
	    outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, -offset,
                                                         chunkHeight),
                                 new Point(_iw + offset,startY));

	} else {
	    //shift right
	    outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, _iw,
                                                         chunkHeight),
                                 new Point(offset, startY));
	    //wrap around
	    outputBMD.copyPixels(inputBMD, new Rectangle(_iw - offset,
                                                         startY, offset,
                                                         chunkHeight),
                                 new Point(0, startY));
	}
    }

    //do color offset
    var channel = getRandChannel();
    outputBMD.copyChannel(inputBMD, new Rectangle(0, 0, _iw, _ih),
                          new Point(getRandInt(-_glitchAmount * 2,
                                               _glitchAmount * 2),
                                    getRandInt(-_glitchAmount * 2,
                                               _glitchAmount * 2)),
                          channel, channel);

    //make brighter
    //convert 1 - 10 -> 1 -> 2
    var b = 1 + _brightnessAmount/10*1;
    var brightMat=[
	b, 0, 0, 0, 0,
	0, b, 0, 0, 0,
	0, 0, b, 0, 0,
	0, 0, 0, 1, 0
    ];

    var zeroPoint = new Point();
    var brightnessFilter = new ColorMatrixFilter(brightMat);
    outputBMD.applyFilter(outputBMD, outputBMD.rect, zeroPoint,
                          brightnessFilter);

    if (_useScanLines){
	//Add Scan Lines
	var line = new Rectangle(0, 0, _iw, 1);
	for (i = 0; i < _ih; i++) {
	    if (i % 2 == 0) {
		line.y = i;
		outputBMD.fillRect(line, 0);
	    }
	}
    }

    //draw to canvas
    _context.putImageData(outputBMD.data, 0, 0);
};

var getRandInt = function(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
};

module.export = glitch;
