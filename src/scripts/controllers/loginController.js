angular.module('myApp')
    .controller('loginController', [ '$scope', '$window', 'ajaxFactory', 'MediaService', 'ngDialog', function ($scope, $window, ajaxFactory, MediaService, ngDialog) {

        $scope.login = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,

            };

            var request = ajaxFactory.login(data);

            request.then(function (response) {

                MediaService.setVariable('userData', response.data);
                $scope.logged = true;
                var finalId = angular.fromJson(response.data.userId);


                console.log("userId: " + finalId);
                localStorage.setItem("loginId", finalId);
                ngDialog.open({
                    template: '<p>Login successful</p>',
                    plain: true
                });



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