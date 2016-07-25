(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthFactory', '$state'];

    /* @ngInject */
    function AuthController(AuthFactory, $state) {
        var vm = this;
        vm.title = 'AuthController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();