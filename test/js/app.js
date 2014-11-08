angular.module('testApp', [])
    .controller('TestController', function($scope) {
        $scope.changeColor = function(value) {
            $scope.img.edit('skin-color')
        };
    })
    .directive('savage', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.img = new Savage(attrs.id);
            }
        }
    });