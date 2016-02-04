angular.module('myApp')
    .controller('registerController', function ($scope, ajaxFactory) {
        

        $scope.register = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                email: $scope.email
            };
            
            var request = ajaxFactory.register(data);
            
            request.then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.log(error.data);
            });

        };
    });