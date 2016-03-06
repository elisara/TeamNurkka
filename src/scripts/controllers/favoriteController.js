angular.module('myApp')
    .controller('favoriteController', ['$scope', '$sce', 'ajaxFactory', 'MediaService', '$routeParams', '$window', function ($scope, $sce, ajaxFactory, MediaService, $routeParams, $window) {


        $scope.path = ajaxFactory.urlBaseImage;
        var user = $routeParams.user;
      
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };


        ajaxFactory.likedByUser(user).success(function (data) {
            $scope.favFiles = data;
            $scope.itemsPerPage = 30;
            $scope.currentPage = 0;
            $scope.total = $scope.favFiles.length;
            $scope.pagedFiles = $scope.favFiles.slice($scope.currentPage * $scope.itemsPerPage,
                $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);

            $scope.loadMore = function () {
                $scope.currentPage++;
                var newItems = $scope.favFiles.slice($scope.currentPage * $scope.itemsPerPage,
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

        $scope.viewNro = 5;

        var request = ajaxFactory.likedByUser(user);
        request.then(function (response) {
            $scope.files = response.data;
        }, function (error) {
            console.log("error:  " + error.data);
        });


    }]);