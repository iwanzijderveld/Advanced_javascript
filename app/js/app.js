require('angular/angular');
require('angular-ui-router');
require('angular-aria/angular-aria');
require('angular-animate/angular-animate');
require('angular-material/angular-material');
require('angular-messages/angular-messages');
require('angular-material-data-table/dist/md-data-table.min.js');

// Create your app
var app = angular.module('webs6', ['ngMaterial', 'ui.router', 'ngMessages', 'ngAnimate']);

// SERVICES
app.service('AuthenticationService', require('./auth/auth.service.js'));
app.service('DashBoardService', require('./dashboard/dashboard.service.js'));
// CONTROLLERS
app.controller('IndexController', require('./index/index.controller.js'));
app.controller('AuthController', require('./auth/auth.controller.js'));
app.controller('DashboardController', require('./dashboard/dashboard.controller.js'));

app.run(function (AuthenticationService, $rootScope) {
    $rootScope.$on('$stateChangeStart', AuthenticationService.authHandler);
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

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
        /*
        .state('app.callback', {
            url: '/authcallback?username&token',
            views: {
                'menuContent': {
                    templateUrl: 'views/dashboard.html',
                    controller: 'AuthController as AuthC'
                }
            }
        })
        */;

    $urlRouterProvider.otherwise('/dashboard');
});