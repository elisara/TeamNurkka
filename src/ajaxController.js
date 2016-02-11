angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        $scope.image = false;
        $scope.feed = true;
        
        ajaxService.success(function (data) {
            $scope.files = data;
        });


        $scope.sendId = function (file, index) {
            $scope.numero = index;
            console.log($scope.numero);
            $scope.changefile = $scope.files[index];
            $scope.theFile = file;
            console.log($scope.theFile);
            $scope.image = true;
            $scope.feed = false;
            return file;
        };
        
    $scope.nextImg = function () {
        $scope.numero ++;
        console.log("Next: " + $scope.numero);
        console.log($scope.theFile);
        
        $scope.changefile = $scope.files[$scope.numero];
        $scope.theFile = $scope.changefile;
        console.log($scope.theFile);
    }
    
    $scope.prevImg = function () {
        $scope.numero --;
        console.log("previous: " + $scope.numero);
        console.log($scope.theFile);
        
        $scope.changefile = $scope.files[$scope.numero];
        $scope.theFile = $scope.changefile;
        console.log($scope.theFile);
    }
    
    });