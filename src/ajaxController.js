angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        ajaxService.success(function (data) {
            $scope.files = data;
        });
        $scope.sendId = function (file) {
            
            $scope.theFile = file;
            console.log($scope.theFile);
            return file;
        };
    });