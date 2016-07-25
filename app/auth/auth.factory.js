(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$http', '$q', 'localStorageService'];

    /* @ngInject */
    function AuthFactory($http, $q, localStorageService) {
        var service = {
            registerUser: registerUser
        };
        return service;

        ////////////////

        function registerUser() {
        }
    }
})();