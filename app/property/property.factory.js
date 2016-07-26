(function() {
    'use strict';

    angular
        .module('app')
        .factory('PropertyFactory', PropertyFactory);

    PropertyFactory.$inject = ['$http', '$q', 'localStorageService'];

    /* @ngInject */
    function PropertyFactory($http, $q, localStorageService) {
    	var url = 'http://localhost:54116/api/properties/'

        var service = {
            getProperties: getProperties
        };
        return service;

        ////////////////

        function getProperties() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;


        }
    }
})();
