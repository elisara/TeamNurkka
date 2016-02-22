angular.module('myApp')
    .directive('commentForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/commentForm.html'
        }
    });