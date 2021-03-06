angular.module('myApp')
    .controller('ownFilesController', ['$scope', '$sce', 'ajaxFactory', 'MediaService', '$routeParams', '$window', function ($scope, $sce, ajaxFactory, MediaService, $routeParams, $window) {


        $scope.path = ajaxFactory.urlBaseImage;
        var user = $routeParams.user;

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };


        ajaxFactory.fileByUser(user).success(function (data) {
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

        var request = ajaxFactory.fileByUser(user);
        request.then(function (response) {
            $scope.files = response.data;
        }, function (error) {
            console.log("error:  " + error.data);
        });


    }]);