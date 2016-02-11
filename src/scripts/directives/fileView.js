angular.module('myApp')
    .directive('fileView', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/fileView.html'
        };
    });