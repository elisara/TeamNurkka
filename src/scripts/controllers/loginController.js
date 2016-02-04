angular.module('myApp')
    .controller('loginController', function ($scope, ajaxFactory) {
        

        $scope.login = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                
            };
            
            var request = ajaxFactory.login(data);
            
            request.then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.log(error.data);
            });

        };
    });