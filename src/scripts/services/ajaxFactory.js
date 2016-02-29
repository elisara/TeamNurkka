angular.module('myApp')
    .factory('ajaxFactory', function ($http, $httpParamSerializer) {
        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        var ajaxFunctions = {};
        ajaxFunctions.urlBaseImage = 'http://util.mw.metropolia.fi/uploads/';

        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + 'upload', args, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        };
        ajaxFunctions.register = function (args) {
            return $http.post(urlBase + 'register', $httpParamSerializer(args), {

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        };
        ajaxFunctions.login = function (args) {
            return $http.post(urlBase + 'login', $httpParamSerializer(args), {

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        };
        ajaxFunctions.comment = function (data, id) {
            return $http.post(urlBase + 'comment/file/' + id, $httpParamSerializer(data), {

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        ajaxFunctions.fileByUser = function (args) {
            return $http.get(urlBase + 'files/user/' + args);
        };

        //elisa 10.2
        ajaxFunctions.fileByType = function (args) {
            return $http.get(urlBase + 'files/type/' + args);
        };

        ajaxFunctions.loadOneMedia = function (id) {
            return $http.get(urlBase + 'file/' + id).success(function (data) {
                return data;
            });
        };
        ajaxFunctions.userById = function (id) {
            return $http.get(urlBase + 'user/' + id).success(function (data) {
                return data;
            });
        };
        ajaxFunctions.getAllFiles = function () {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/').success(function (data) {
                return data;
            });
        };
        ajaxFunctions.getImageFiles = function () {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/image/').success(function (data) {
                return data;
            });
        };

        ajaxFunctions.commentsByFileId = function (id) {
            return $http.get(urlBase + 'comments/file/' + id).success(function (data) {
                return data;
            });
        };
            //elisa 24.2
        ajaxFunctions.getVideoFiles = function () {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/video/').success(function (data) {
                return data;
            });
        };

        //elisa 24.2
        ajaxFunctions.getAudioFiles = function () {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/audio/').success(function (data) {
                return data;
            });
        };




        return ajaxFunctions;
    });