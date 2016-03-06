angular.module('myApp')
    .controller('searchController', ['$scope', '$window', 'ajaxFactory', 'MediaService', 'ngDialog', '$routeParams', '$sce', function ($scope, $window, ajaxFactory, MediaService, ngDialog, $routeParams, $sce) {
        
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + src);
        };
  
            var data = {
                title: $scope.aTitle
            };
              
            console.log(data);
            var request = ajaxFactory.searchTitle(data);

            request.then(function (response) {
                $scope.searchFiles = response.data;
                console.log($scope.searchFiles);
                

            }, function (error) {
                console.log(error.data);
            });
        }]);