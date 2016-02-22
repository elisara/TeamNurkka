angular.module('myApp')
    .controller('fileTypeController', function ($scope, ajaxFactory) {

        $scope.path = ajaxFactory.urlBaseImage;
        


        $scope.getImage = function () {
            var request = ajaxFactory.fileByType('image');


            request.then(function (response) {
                $scope.files = response.data;
                console.log($scope.files);
                console.log(ajaxFactory.fileByType('image'));
            }, function (error) {
                console.log(error.data);
            });
        };
    
    });