console.log($('#sample'))
var img = new Savage('sample');
img.edit('outer-rect')
    .fill('#5bff38')
    .stroke('#ff362a', 8);
console.log('img', img)