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

function Savage(iFrameId) {
    this.VERSION = '0.1';
    this.svgParent = this._getParentById(iFrameId);
}

/**
 * Prepare svg inside of iFrame for editing
 */
Savage.prototype.initialize = function (iFrameId) {
    var root = this;
};

/**
 * Replace img with SVG code if not using <iframe>, <object>, or <embed> elements
 */
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
 * Helper function to determine if element has specified in-line style
 */
Savage.prototype._inlineStyle = function(el, property) {
    var
        styles = el.attr('style'),
        value;

    if (styles) {
        $.each(styles.split(';'), function(i, e) {
            var style = e.split(":");
            if ($.trim(style[0]) === prop) {
                 value = style[1];
             }
        });
    }
    return value;
};

/**
 * Return all IDs of the SVG img
 */
Savage.prototype._getIds = function($svg) {
    var allShapes, ids = [];
    if (!($svg instanceof jQuery)) $shape = $($svg);
    $shape = $svg;
    allShapes = $shape.children();
    $.each(allShapes, function(key, shape) {
        ids.push(shape.id);
    });
    return ids;
};

/**
 * Determine if element you want to edit is an <iframe>
 */
Savage.prototype._isIFrame = function(el) {
    return el instanceof HTMLIFrameElement;
};

/**
 * Get SVG parent element by Id
 */
Savage.prototype._getParentById = function(id) {
    var
        root = this,
        svgParent,
        element = document.getElementById(id);

    svgParent = $('#' + id).contents().children();
    return svgParent;
};

/**
 * Get svg shape by Id
 */
Savage.prototype._getShapeByLayerId = function($parent, layerId) {
    return $parent.find('#'+layerId).children();
};

/**
 * Use CSS to edit individual shapes by ID
 */
Savage.prototype.edit = function(shapeId) {
    var root = this;
    var $shape = root._getShapeByLayerId(this.svgParent, shapeId);
    console.log('$shape', $shape)
    return {
        fill: function(color) {
            if (color.indexOf('#') === -1) color = '#' + color;
            $shape.css('fill', color);
            return this;
        },
        stroke: function(color, stroke_width, stroke_linecap) {
            if (color) {
                if (color.indexOf('#') === -1) color = '#' + color;
                $shape.css('stroke', color);
            }
            if (stroke_width) {
                $shape.css('stroke-width', stroke_width);
            }
            if (stroke_linecap) {
                $shape.css('stroke-linecap', stroke_linecap);
            }
            return this;
        }
    }
};


