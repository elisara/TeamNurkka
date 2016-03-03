angular.module('myApp')
    .controller('uploadController', [ '$scope', '$window', 'ajaxFactory', function ($scope, $window, ajaxFactory) {
        $scope.setMediaFile = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0,5);
        };


        $scope.sendImage = function () {
            $scope.uploadId = localStorage.getItem('loginId');
            console.log("UPLOADIS ID: " + localStorage.getItem('loginId'));
            var fd = new FormData(document.getElementById('uploadForm'));
            fd.append('user', $scope.uploadId);
            fd.append('type', $scope.type);
            fd.append('mime-type', $scope.mimeType);
            
             var request = ajaxFactory.uploadFile(fd);
            
            request.then(function (response) {
                console.log(response.data);
                //$window.location.reload();
            }, function (error) {
                console.log(error.data);
            });

        };
    }]);