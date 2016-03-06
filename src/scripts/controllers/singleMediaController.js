angular.module('myApp')
    .controller('singleMediaController', ['$scope', '$rootScope', 'ajaxFactory', 'MediaService', '$routeParams', '$sce', '$window', function ($scope, $rootScope, ajaxFactory, MediaService, $routeParams, $sce, $window) {

        var file = MediaService.theFile;
        $scope.ownId = localStorage.getItem('loginId');
        var id = $routeParams.id;
        $scope.liked = false;
        var likedPicCount = 0;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };



        ajaxFactory.loadOneMedia(id).success(function (data) {
            $scope.thisFile = data;

            ajaxFactory.likedByUser($scope.ownId).success(function (data) {
                var filesLikedByUser = data;

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
                console.log("Uploader ID: " + $scope.thisUser.userId);
            });
            ajaxFactory.commentsByFileId(id).success(function (data) {
                $scope.comments = data;

                console.log($scope.thisUser);
            });

        });
        
        $scope.isLiked = function () {
                return $scope.liked === true;
            };
        
        $scope.likeThis = function(){
            ajaxFactory.like(id, $scope.ownId);
            //$window.location.reload();
        };
        
        $scope.unlikeThis = function(){
            ajaxFactory.unlike(id, $scope.ownId);
            //$window.location.reload();
        };


        $scope.comment = function () {
            var data = {
                user: localStorage.getItem('loginId'),
                comment: $scope.comment1,
            };

            var request = ajaxFactory.comment(data, id);
            request.then(function (response) {
                console.log(response.data);
                $window.location.reload();

            }, function (error) {
                console.log(error.data);
            });

        };

        $scope.isLogin = function () {
            return localStorage.getItem('loginId') !== null;
        };

        $scope.nextImg = function () {
            id = parseInt(id) + 1;
            $scope.liked = false;
            ajaxFactory.loadOneMedia(id).success(function (data) {
                $scope.thisFile = data;
                console.log("IMAGE ID SINGLEMEDIACTRL: " + id);
                console.log("PATH: " + $scope.thisFile.path);

                ajaxFactory.userById($scope.thisFile.userId).success(function (data) {
                    $scope.thisUser = data;
                    $scope.ownImagesId = $scope.thisUser.userId;
                    console.log("USER ID: " + $scope.thisUser.userId);
                });
                ajaxFactory.commentsByFileId(id).success(function (data) {
                    $scope.comments = data;

                    console.log($scope.thisUser);
                });

            });

            console.log(id);
           
        };
        $scope.prevImg = function () {
            id = parseInt(id) - 1;
            $scope.liked = false;
            ajaxFactory.loadOneMedia(id).success(function (data) {
                $scope.thisFile = data;
                console.log("IMAGE ID SINGLEMEDIACTRL: " + id);
                console.log("PATH: " + $scope.thisFile.path);

                ajaxFactory.userById($scope.thisFile.userId).success(function (data) {
                    $scope.thisUser = data;
                    $scope.ownImagesId = $scope.thisUser.userId;
                    console.log("USER ID: " + $scope.thisUser.userId);
                });
                ajaxFactory.commentsByFileId(id).success(function (data) {
                    $scope.comments = data;

                    console.log($scope.thisUser);
                });

            });

            console.log(id);
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

        $scope.saveImage = function (img) {
            saveImageToPhone(img, success, error);
        };

    }]);