angular.module('myApp')
    .controller('singleMediaController', ['$scope', '$rootScope', 'ajaxFactory', 'MediaService', '$routeParams', '$sce', '$window', function ($scope, $rootScope, ajaxFactory, MediaService, $routeParams, $sce, $window) {



        var file = MediaService.theFile;
        $scope.ownId = localStorage.getItem('loginId');
        var id = $routeParams.id;
        $scope.liked = false;


        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };

        ajaxFactory.getAllFiles().success(function (data) {
            $scope.allFiles = data;
        });


        var request = ajaxFactory.loadOneMedia(id).success(function (data) {
            request.then(function (response) {
                $scope.thisFile = response.data;

                ajaxFactory.likedByUser($scope.ownId).success(function (data) {
                    var filesLikedByUser = data;
                    var likedPicCount = 0;

                    do {
                        if (filesLikedByUser[likedPicCount]['fileId'] == id) {
                            $scope.liked = true;
                        }
                        likedPicCount++;
                    } while (likedPicCount < filesLikedByUser.length);
                });
                ajaxFactory.userById($scope.thisFile.userId).success(function (data) {
                    $scope.thisUser = data;
                    $scope.ownImagesId = $scope.thisUser.userId;
                });
                ajaxFactory.commentsByFileId(id).success(function (data) {
                    $scope.comments = data;
                });
            }, function (error) {
                console.log(error.data);
            });

        });

        $scope.isLiked = function () {
            return $scope.liked === true;
        };

        $scope.likeThis = function () {
            var request = ajaxFactory.like(id, $scope.ownId);
            request.then(function (response) {

            }, function (error) {
                console.log(error.data);
            });
            $window.location.reload();
        };

        $scope.unlikeThis = function () {
            var request = ajaxFactory.unlike(id, $scope.ownId);
            request.then(function (response) {

            }, function (error) {
                console.log(error.data);

            });
            $window.location.reload();
        };


        $scope.comment = function () {
            var data = {
                user: localStorage.getItem('loginId'),
                comment: $scope.comment1,
            };

            var request = ajaxFactory.comment(data, id);
            request.then(function (response) {
                $window.location.reload();

            }, function (error) {
                console.log(error.data);
            });
        };

        $scope.isLogin = function () {
            return localStorage.getItem('loginId') !== null;
        };


        $scope.nextImg = function () {
            if (parseInt(id) >= $scope.allFiles[$scope.allFiles.length - 1].fileId) {
                id = parseInt(id) - 1;
            }
            $window.location.href = '#/image/' + id;
        };

        $scope.prevImg = function () {
            if (parseInt(id) < $scope.allFiles[0].fileId) {
                id = parseInt(id) + 1;
            }
            $window.location.href = '#/image/' + id;
        };


        function saveImageToPhone(img, success, error) {
            var canvas, context, imageDataUrl, imageData;
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            try {
                imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
                cordova.exec(
                    success,
                    error,
                    'Canvas2ImagePlugin',
                    'saveImageDataToLibrary', [imageData]
                );
            } catch (e) {
                error(e.message);
            }
        }

        var success = function (msg) {
            console.info(msg);
        };

        var error = function (err) {
            console.error(err);
        };

        $scope.saveImage = function (url) {
            cordova.exec(null, null, "InAppBrowser", "open", [url, "_system"]);
        };

    }]);