angular.module('myApp')
    .controller('fileTypeController', ['$scope', 'ajaxFactory', '$routeParams', function ($scope, ajaxFactory, $routeParams) {

        $scope.path = ajaxFactory.urlBaseImage;
        var id = $routeParams.id;


        ajaxFactory.getImageFiles().success(function (data) {
            $scope.imageFiles = data;
            $scope.itemsPerPage = 30;
            $scope.currentPage = 0;
            $scope.total = $scope.imageFiles.length;
            $scope.imagepagedFiles = $scope.imageFiles.slice($scope.currentPage * $scope.itemsPerPage,
                $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);

            $scope.loadMore = function () {
                $scope.currentPage++;
                var newItems = $scope.imageFiles.slice($scope.currentPage * $scope.itemsPerPage,
                    $scope.currentPage * $scope.itemsPerPage + $scope.itemsPerPage);
                $scope.imagepagedFiles = $scope.imagepagedFiles.concat(newItems);
            };

            $scope.nextPageDisabledClass = function () {
                return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
            };

            $scope.pageCount = function () {
                return Math.ceil($scope.total / $scope.itemsPerPage);
            };
        });


        ajaxFactory.getVideoFiles().success(function (data) {
            $scope.videoFiles = data;
        });

        ajaxFactory.getAudioFiles().success(function (data) {
            $scope.audioFiles = data;

        });

    }]);