(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'LocalStorageModule']);

    app.config(function(localStorageServiceProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        // $httpProvider.interceptors.push('AuthorizationInterceptor');

        // localStorageServiceProvider
        //     .setPrefix('app')
        //     .setStorageType('localStorage')
        //     .setNotify(true, true)

        $urlRouterProvider.otherwise('/home');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: '../partials/partial-home.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        })

        // MULTIPLE ADDITIONAL STATES AND NESTED VIEWS =========================
        	.state('registration', {
            url: '/registration',
            templateUrl: '../partials/partial-registration.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        })

    });
})();
