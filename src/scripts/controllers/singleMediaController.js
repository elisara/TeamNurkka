angular.module('myApp')
    .controller('singleMediaController',[ '$scope', '$rootScope', 'ajaxFactory', 'MediaService', '$routeParams', '$sce', '$window',  function ($scope, $rootScope, ajaxFactory, MediaService, $routeParams, $sce, $window) {

        var file = MediaService.theFile;
        $scope.ownId = localStorage.getItem('loginId');
        var id = $routeParams.id;
        
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };
       


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

    }]);