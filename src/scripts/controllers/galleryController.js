angular.module('myApp')
    .controller('galleryController', function ($scope, $rootScope, ajaxFactory, MediaService) {
        $scope.image = false;
        $scope.feed = true;
        $scope.imageFeed = false;

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
            MediaService.setVariable('theFile', file);
            return file;

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
        $scope.sendImageId = function (file) {
            $scope.theFile = file;
            console.log($scope.theFile);
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = true;
            return file;
        };
        $scope.onlyImages = function () {
            $scope.image = false;
            $scope.feed = false;
            $scope.imageFeed = true;

        };

        ajaxFactory.getAllFiles().success(function (data) {
            $scope.files = data;
            $scope.itemsPerPage = 12;
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
    });