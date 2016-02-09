angular.module('myApp')
    .controller('loginController', function ($scope, $window, ajaxFactory, MediaService) {
        

        $scope.login = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                
            };
            
            var request = ajaxFactory.login(data);
            
            request.then(function (response) {
                console.log(response.data);
                MediaService.setVariable('userData', response.data);
                $scope.logged = true;
                 //$window.location.reload();
            }, function (error) {
                console.log(error.data);
            });

        };
    });