angular.module('myApp')
    .controller('uploadController', function ($scope, $window, ajaxFactory) {
        $scope.setMediaFile = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0,5);
        };


        $scope.sendImage = function () {
            var fd = new FormData(document.getElementById('uploadForm'));
            fd.append('user', 13);
            fd.append('type', $scope.type);
            fd.append('mime-type', $scope.mimeType);
            
             var request = ajaxFactory.uploadFile(fd);
            
            request.then(function (response) {
                console.log(response.data);
                $window.location.reload();
            }, function (error) {
                console.log(error.data);
            });

        };
    });