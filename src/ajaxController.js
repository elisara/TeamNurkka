angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        $scope.image = false;
        $scope.feed = true;
        
        ajaxService.success(function (data) {
            $scope.files = data;
        });


        $scope.sendId = function (file) {

            $scope.theFile = file;
            console.log($scope.theFile);
            $scope.image = true;
            $scope.feed = false;
            return file;
        };
        
    });