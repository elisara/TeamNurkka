angular.module('myApp', ['ngRoute', 'ngTouch', 'LocalStorageModule', 'ngDialog'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/showFiles.html',
                controller: 'userFilesController'
            })
            .when('/audio', {
                templateUrl: 'views/audioForm.html',
                controller: 'fileTypeController'
            })
            .when('/images', {
                templateUrl: 'views/imageForm.html',
                controller: 'fileTypeController'
            })
            .when('/videos', {
                templateUrl: 'views/videoForm.html',
                controller: 'fileTypeController'
            })
            .when('/ownpage/:user', {
                templateUrl: 'views/ownForm.html',
                controller: 'ownFilesController'
            })
            .when('/favorites/:user', {
                templateUrl: 'views/favoriteForm.html',
                controller: 'favoriteController'
            })
            .when('/image/:id', {
                templateUrl: 'views/fileView.html',
                controller: 'singleMediaController'
            })
            .when('/search/:aTitle', {
                templateUrl: 'views/searchForm.html',
                controller: 'searchController'
            })

        .otherwise({
            redirectTo: '/'
        });
    });