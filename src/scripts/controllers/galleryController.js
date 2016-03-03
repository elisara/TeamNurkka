angular.module('myApp')
    .controller('galleryController', ['$scope', '$rootScope', 'ajaxFactory', 'MediaService', function ($scope, $rootScope, ajaxFactory, MediaService) {
        $scope.image = false;
        $scope.feed = true;
        $scope.imageFeed = false;
        $scope.ownFeed = false;
        $scope.viewNro = 1;
        $scope.ownId = localStorage.getItem('loginId');
        console.log($scope.ownId);


        var file = MediaService.theFile;
        $scope.timeNow = new Date();

        $scope.$on('mediaevent', function (evt) {
            //console.log(MediaService.theFile.fileId);
            ajaxFactory.loadOneMedia(MediaService.theFile.fileId).success(function (data) {
                $scope.thisFile = data;
                //console.log($scope.thisFile.userId);
                ajaxFactory.userById($scope.thisFile.userId).success(function (data) {
                    $scope.thisUser = data;
                    $scope.ownImagesId = $scope.thisUser.userId;
                     
                });
                ajaxFactory.commentsByFileId(MediaService.theFile.fileId).success(function (data) {
                    $scope.comments = data;
                    //$scope.commentOwnId = $scope.comments.userId;
                    //console.log($scope.thisUser);
                });

            });


        });

        $scope.comment = function () {
            var data = {
                user: localStorage.getItem('loginId'),
                comment: $scope.comment1,
            };

            var request = ajaxFactory.comment(data, MediaService.theFile.fileId);
            request.then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.log(error.data);
            });

        };

        $scope.isLogin = function () {
            return localStorage.getItem('loginId') !== null;
        };



        ajaxFactory.getAllFiles().success(function (data) {
            $scope.files = data;
        });

        $scope.sendId = function (file, index) {
            $scope.numero = index;
            $scope.changefile = $scope.files[index];
            $rootScope.theFile = file;
            //console.log($scope.theFile);
            $scope.image = true;
            $scope.feed = false;
            $scope.imageFeed = false;
            $scope.videoFeed = false;
            $scope.audioFeed = false;
            $scope.ownFeed = false;
            MediaService.setVariable('theFile', file);
            return file;

        };

        $scope.backIt = function () {

            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = false;
            $scope.videoFeed = false;
            $scope.audioFeed = false;
            $scope.ownFeed = false;
            if ($scope.viewNro == 1) {
                $scope.feed = true;
            }
            if ($scope.viewNro == 2) {
                $scope.imageFeed = true;
            }
            if ($scope.viewNro == 3) {
                $scope.videoFeed = true;
            }
            if ($scope.viewNro == 4) {
                $scope.audioFeed = true;
            }
            if ($scope.viewNro == 5) {
                $scope.ownFeed = true;
            }


        };


        $scope.nextImg = function () {
            $scope.numero++;
            console.log("Next: " + $scope.numero);
            console.log($scope.theFile);

            $scope.changefile = $scope.files[$scope.numero];
            $scope.theFile = $scope.changefile;
            console.log($scope.theFile);
        };
        $scope.prevImg = function () {
            $scope.numero--;
            console.log("previous: " + $scope.numero);
            console.log($scope.theFile);

            $scope.changefile = $scope.files[$scope.numero];
            $scope.theFile = $scope.changefile;
            console.log($scope.theFile);
        };
        $scope.onlyImages = function () {
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = true;
            $scope.audioFeed = false;
            $scope.videoFeed = false;
            $scope.ownFeed = false;
            $scope.viewNro = 2;

        };


        $scope.onlyVideos = function () {
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = false;
            $scope.videoFeed = true;
            $scope.audioFeed = false;
            $scope.ownFeed = false;
            $scope.viewNro = 3;

        };

        $scope.onlyAudio = function () {
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = false;
            $scope.videoFeed = false;
            $scope.audioFeed = true;
            $scope.ownFeed = false;
            $scope.viewNro = 4;

        };

        $scope.onlyOwn = function (args) {
            $scope.usedId = args;
            ajaxFactory.fileByUser($scope.usedId).success(function (data) {
                $scope.ownFiles = data;
                $scope.itemsPerPage = 30;
                $scope.currentPage = 0;
                $scope.total = $scope.ownFiles.length;
                $scope.pagedFiles = $scope.ownFiles.slice($scope.currentPage * $scope.itemsPerPage,
                    $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);

                $scope.loadMore = function () {
                    $scope.currentPage++;
                    var newItems = $scope.ownFiles.slice($scope.currentPage * $scope.itemsPerPage,
                        $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);
                    $scope.pagedFiles = $scope.pagedFiles.concat(newItems);
                };

                $scope.nextPageDisabledClass = function () {
                    return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
                };

                $scope.pageCount = function () {
                    return Math.ceil($scope.total / $scope.itemsPerPage);
                };
            });
            console.log(args);
            console.log("Only own files!");
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = false;
            $scope.videoFeed = false;
            $scope.audioFeed = false;
            $scope.ownFeed = true;
            $scope.viewNro = 5;

        };


        ajaxFactory.getAllFiles().success(function (data) {
            $scope.files = data;
            $scope.itemsPerPage = 30;
            $scope.currentPage = 0;
            $scope.total = $scope.files.length;
            $scope.pagedFiles = $scope.files.slice($scope.currentPage * $scope.itemsPerPage,
                $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);

            $scope.loadMore = function () {
                $scope.currentPage++;
                var newItems = $scope.files.slice($scope.currentPage * $scope.itemsPerPage,
                    $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);
                $scope.pagedFiles = $scope.pagedFiles.concat(newItems);
            };

            $scope.nextPageDisabledClass = function () {
                return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
            };

            $scope.pageCount = function () {
                return Math.ceil($scope.total / $scope.itemsPerPage);
            };
        });


    }]);