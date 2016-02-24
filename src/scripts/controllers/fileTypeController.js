angular.module('myApp')
    .controller('fileTypeController', function ($scope, ajaxFactory) {

        $scope.path = ajaxFactory.urlBaseImage;


        ajaxFactory.getImageFiles().success(function (data) {
            $scope.imageFiles = data;
        });

        ajaxFactory.getVideoFiles().success(function (data) {
            $scope.videoFiles = data;
        });

        ajaxFactory.getAudioFiles().success(function (data) {
            $scope.audioFiles = data;
        });

        //getting images from server
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

        //getting videos from server
        $scope.getVideo = function () {
            var request = ajaxFactory.fileByType('video');
            request.then(function (response) {
                $scope.files = response.data;
                console.log($scope.files);
                console.log(ajaxFactory.fileByType('video'));
            }, function (error) {
                console.log(error.data);
            });
        };
    
        //getting audio from server
        $scope.getAudio = function () {
            var request = ajaxFactory.fileByType('audio');
            request.then(function (response) {
                $scope.files = response.data;
                console.log($scope.files);
                console.log(ajaxFactory.fileByType('audio'));
            }, function (error) {
                console.log(error.data);
            });
        };

    });