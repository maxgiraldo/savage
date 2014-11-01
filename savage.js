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
 * Replace img with SVG code if not using <iframe>, <object>, or <embed>
 * elements
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
 * Helper function to determine if element has
 * specified in-line style
 */
Savage.prototype._inlineStyle = function (prop, el) {
    var styles = el.attr("style"),
         value;
    if (styles) {
        styles.split(";").forEach(function (e) {
            var style = e.split(":");
            if ($.trim(style[0]) === prop) {
                 value = style[1];
             }
        });
    }
    return value;
};

/**
 * Use CSS to edit individual shapes by ID
 */
Savage.prototype.edit = function($shape) {
    var root = this;
    if (!($shape instanceof jQuery)) {
        $shape.indexOf('#') === -1 ? $shape = $('#' + $shape) : $shape = $($shape);
    }
    return {
        fill: function(color) {
            if (color.indexOf('#') === -1) color = '#' + color;
            console.log(root._inlineStyle('fill', $shape))
            $shape.attr('fill', color);
            return this;
        },
        stroke: function(color, stroke_width, stroke_linecap) {
            if (color) {
                if (color.indexOf('#') === -1) color = '#' + color;
                $shape.attr('stroke', color);
            }
            if (stroke_width) {
                $shape.attr('stroke-width', stroke_width);
            }
            if (stroke_linecap) {
                $shape.attr('stroke-linecap', stroke_linecap);
            }
            return this;
        }
    }
};

/**
 * Return all IDs of the SVG img
 */
Savage.prototype.getIDs = function($svg) {
    var allShapes, ids = [];
    if (!($svg instanceof jQuery)) {
        var classOrId = $svg.split('')[0];
        if (classOrId === '.') {
            $svg = $('.' + $svg);
        } else if (classOrId === '#') {
            $svg = $('#' + $svg);
        } else {
            throw new TypeError('Invalid parameter. Must be class, id, or jQuery element.');
        }
    }
    allShapes = $svg.children();
    $.each(allShapes, function(key, shape) {
        ids.push(shape.id);
    });
    return ids;
};

/**
 * Highlight what parts of the image are editable
 */
Savage.prototype.highlight = function($svg, color) {
    var root = this;
    var ids = root.getIDs($svg);
    console.log(ids)
    $.each(ids, function (id) {
        console.log(id)
        root.edit(id)
            .fill(color);
    });
};


