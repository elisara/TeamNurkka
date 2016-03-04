angular.module('myApp')
    .controller('galleryController', ['$scope', '$rootScope', 'ajaxFactory', 'MediaService', '$routeParams', '$window', function ($scope, $rootScope, ajaxFactory, MediaService, $routeParams, $window) {
       
        $scope.viewNro = 1;
        $scope.ownId = localStorage.getItem('loginId');
        console.log($scope.ownId);
        var id = $routeParams.id;
        var file = MediaService.theFile;
        $scope.timeNow = new Date();
    

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

       

        $scope.nextImg = function () {
            $scope.numero++;
            console.log("Next: " + $scope.numero);
            console.log($scope.theFile);

            $scope.changefile = $scope.files[$scope.numero];
            $scope.theFile = $scope.changefile;
            console.log($scope.theFile);
            $window.location.reload();
        };
        $scope.prevImg = function () {
            $scope.numero--;
            console.log("previous: " + $scope.numero);
            console.log($scope.theFile);

            $scope.changefile = $scope.files[$scope.numero];
            $scope.theFile = $scope.changefile;
            console.log($scope.theFile);
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
        
         $scope.isLoggedIn = function () {
            return localStorage.getItem('loginId') !== null;


        };


    }]);