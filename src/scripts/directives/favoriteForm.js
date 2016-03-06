angular.module('myApp')
    .directive('favoriteForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/favoriteForm.html'
        };
    });