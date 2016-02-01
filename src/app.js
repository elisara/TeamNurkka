angular.module('myApp', [])
    .controller('UploadController', function ($scope, $http) {
        $scope.setMediaFile = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0,5);
        };


        $scope.sendImage = function () {
            var fd = new FormData(document.getElementById('fileForm'));
            fd.append('user', 13);
            fd.append('type', $scope.type);
            fd.append('mime-type', $scope.mimeType);
            var request = $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
            request.then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.log(error.data);
            });

        };
    });