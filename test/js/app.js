angular.module('testApp', [])
    .directive('savage', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var img = new Savage(attrs.id);
                element.on('click', function() {
                    img.edit('outer-rect').fill('#000')
                });
            },
            template: '<iframe id="sample" src="img/sample.svg"></iframe>'
        }
    });
// console.log($('#sample'))
// var img = new Savage('sample');
// img.edit('outer-rect')
//     .fill('#5bff38')
//     .stroke('#ff362a', 8);
// console.log('img', img)