angular.module('myApp')
    .controller('singleMediaController',[ '$scope', '$rootScope', 'ajaxFactory', 'MediaService',  function ($scope, $rootScope, ajaxFactory, MediaService) {

        var file = MediaService.theFile;
        $scope.timeNow = new Date();

        $scope.$on('mediaevent', function (evt) {
            //console.log(MediaService.theFile.fileId);
            ajaxFactory.loadOneMedia(MediaService.theFile.fileId).success(function (data) {
                $scope.thisFile = data;
                //console.log($scope.thisFile.userId);
                ajaxFactory.userById($scope.thisFile.userId).success(function (data) {
                    $scope.thisUser = data;
                    console.log("USER ID: " +$scope.thisUser.userId);
                });
                ajaxFactory.commentsByFileId(MediaService.theFile.fileId).success(function (data) {
                    $scope.comments = data;

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

    }]);