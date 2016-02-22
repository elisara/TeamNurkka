angular.module('myApp')
    .directive('imageForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/imageForm.html'
        };
    });