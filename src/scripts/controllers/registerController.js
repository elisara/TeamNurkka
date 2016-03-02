angular.module('myApp')
    .controller('registerController', [ '$scope', '$window', 'ajaxFactory', 'MediaService', 'ngDialog', function ($scope, $window, ajaxFactory, MediaService, ngDialog) {


        $scope.register = function () {
            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                email: $scope.email
            };

            var request = ajaxFactory.register(data);

            request.then(function (response) {
                console.log(response.data);
                MediaService.setVariable('userData', response.data);
                $scope.logged = true;

                ngDialog.open({
                    template: '<p>Register completed!</p>',
                    plain: true
                });
                //$window.location.reload();
            }, function (error) {
                console.log(error.data);
            });

        };
    }]);