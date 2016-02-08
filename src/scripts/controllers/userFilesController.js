angular.module('myApp')
    .controller('userFilesController', function ($scope, $sce, ajaxFactory, MediaService) {    
    
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl+src);
        };
        
    
        $scope.$on('mediaevent', function(evt){
            console.log(evt);
            var user = MediaService.userData;
            console.log(user.userId);
            
            var request = ajaxFactory.fileByUser(user.userId);

            request.then(function (response) {
                $scope.files = response.data;
            }, function (error) {
                console.log(error.data);
            });
        });
    });