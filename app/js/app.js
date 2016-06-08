require('angular/angular');
require('angular-ui-router');
require('angular-aria/angular-aria');
require('angular-animate/angular-animate');
require('angular-material/angular-material');
require('angular-messages/angular-messages');
require('angular-material-data-table/dist/md-data-table.min.js');

// Create your app
var app = angular.module('webs6', ['ngMaterial', 'ui.router', 'ngMessages', 'ngAnimate']);
// DIRECTIVES
app.directive('tile', require('./directives/tile.directive.js'));
// SERVICES
app.service('APIService', require('./util/api.service.js'));
app.service('AuthenticationService', require('./auth/auth.service.js'));
app.service('DashBoardService', require('./dashboard/dashboard.service.js'));
app.service('GameService', require('./game/game.service.js'));

// Factories
app.factory('HttpRequestInterceptor', require('./util/requestinterceptor.factory.js'));
app.factory('Socket', require('./util/socket.factory.js'));

// CONTROLLERS
app.controller('IndexController', require('./index/index.controller.js'));
app.controller('AuthController', require('./auth/auth.controller.js'));
app.controller('DashboardController', require('./dashboard/dashboard.controller.js'));
app.controller('GameController', require('./game/game.controller.js'));
app.run(function (AuthenticationService, $rootScope) {
    $rootScope.$on('$stateChangeStart', AuthenticationService.authHandler);
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $httpProvider) {
    // Prepare our http requests with Token and username
    $httpProvider.interceptors.push('HttpRequestInterceptor');

    // Themes
    $mdThemingProvider.theme('login-form')
        .primaryPalette('green', {
            'default': '400',
        })
        .backgroundPalette('grey', {
            'default': '200'
        });

    $mdThemingProvider.theme('dashboard')
        .primaryPalette('orange')
        .accentPalette('lime')
        .backgroundPalette('grey',
        {
            'default': '50'
        });


    $stateProvider

        .state('landing', {
            url: '/landing?username&token',
            templateUrl: 'views/login/landing.html',
            controller: 'AuthController as AuthC'
        })
        .state('app', {
            abstract: true,
            templateUrl: 'views/menu.html',
            controller: 'IndexController as IndexC'
        })
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardController as DashC'
                }
            }
        })
        .state('app.game', {
            url: '/game/:id',
            views: {
                'menuContent': {
                    templateUrl: 'views/game/gamepage.html',
                    controller: 'GameController as GameC'
                }
            }
        })
        ;

    $urlRouterProvider.otherwise('/dashboard');
});