angular.module('myApp')
    .directive('ownForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/ownForm.html'
        };
    });