// The MIT License (MIT)

// Copyright (c) 2014 Maximilian A. Giraldo

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

function Savage() {
    this.VERSION = '0.1';
    this.default = {
        width: 100,
        height: 100
    };
}

/**
    Replace image with SVG code if not using <iframe>, <object>, or <embed> elements
**/

Savage.prototype.convert = function(elID) {
    var $img = $( '#' + elID );
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
    }, 'xml');
};

/**
    Use CSS to edit individual shapes by ID
**/

Savage.prototype.edit = function($shape) {
    if (!($shape instanceof jQuery)) var $shape = $('#' + $shape);
    return {
        fill: function(color) {
            $shape.removeAttr('style');
            $shape.css('fill', color);
            return this;
        },
        stroke: function(color, stroke_width) {
            if (stroke_width && !stroke_width.match(/px/)) stroke_width += "px";
            $shape.css('stroke', color);
            $shape.css('stroke-width', stroke_width);
            return this;
        }
    }
};

/**
    Return all IDs of the SVG img
**/

Savage.prototype.getIDs = function($svg) {
    var allShapes, ids = [];
    if (!($svg instanceof jQuery)) {
        var $svg = $('#' + $svg);
    }
    allShapes = $svg.children();
    $.each(allShapes, function(key, shape) {
        ids.push(shape.id);
    });
    return ids;
};

/**
    Highlight what parts of the image are editable
**/

Savage.prototype.highlight = function() {
};


