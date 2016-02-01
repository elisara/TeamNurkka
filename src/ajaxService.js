angular.module('myApp')
    .factory('ajaxService', function ($http) {
        return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/image')
            .success(function (data) {
                return data;
            })
            .error(function (err) {
                return err;
            });
    });