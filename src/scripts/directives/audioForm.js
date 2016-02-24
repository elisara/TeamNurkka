angular.module('myApp')
    .directive('audioForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/audioForm.html'
        };
    });