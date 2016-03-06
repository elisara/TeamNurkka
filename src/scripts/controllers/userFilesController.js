angular.module('myApp')
    .controller('userFilesController',[ '$scope', '$sce', 'ajaxFactory', 'MediaService', function ($scope, $sce, ajaxFactory, MediaService) {

        $scope.path = ajaxFactory.urlBaseImage;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };


        $scope.$on('mediaevent', function (evt) {
            var user = MediaService.userData;

            if (user.userId > 0) {
                var request = ajaxFactory.fileByUser(user.userId);

                request.then(function (response) {
                    $scope.files = response.data;
                }, function (error) {
                    console.log("error:  " + error.data);
                });

            }


        });

    }]);