angular.module('myApp')
    .controller('loginController', [ '$scope', '$window', 'ajaxFactory', 'MediaService', 'ngDialog', function ($scope, $window, ajaxFactory, MediaService, ngDialog) {

        $scope.login = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,

            };

            var request = ajaxFactory.login(data);
            request.then(function (response) {

                if (response.data.status == "login ok") {
                    //MediaService.setVariable('userData', response.data);
                    var finalId = angular.fromJson(response.data.userId);
                    console.log("userId: " + finalId);
                    localStorage.setItem("loginId", finalId);
                    ngDialog.open({
                        template: '<p>Login successful</p>',
                        plain: true
                    });
                } else {
                    ngDialog.open({
                        template: 'Wrong username or password',
                        plain: true
                    });
                }
            }, function (error) {
                console.log(error.data);
            });
           
        };

        $scope.logout = function () {
            localStorage.clear();
            console.log("loggaa ulos");
            $window.location.reload();
        };
        $scope.checkStorage = function () {
            return localStorage.getItem('loginId') !== null;


        };
    
       

    }]);