angular.module('myApp')
    .directive('videoForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/videoForm.html'
        };
    });