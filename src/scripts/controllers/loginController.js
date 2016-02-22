angular.module('myApp')
    .controller('loginController', function ($scope, $window, ajaxFactory, MediaService) {
       


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
            
            return localStorage.getItem('loginId') != null;
           
            
        };
    });