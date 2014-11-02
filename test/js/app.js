var savage = new Savage('sample');

var $svgParent = savage._getParentById('sample');

var $shape = savage._getShapeById($svgParent, 'outer-rect');

var img = new Savage('sample');
img.edit('outer-rect')
    .fill('#5bff38')
    .stroke('#ff362a', 8);
