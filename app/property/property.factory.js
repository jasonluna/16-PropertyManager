(function() {
    'use strict';

    angular
        .module('app')
        .factory('PropertyFactory', PropertyFactory);

    PropertyFactory.$inject = ['$http', '$q', 'localStorageService'];

    /* @ngInject */
    function PropertyFactory($http, $q, localStorageService) {
    	var url = 'http://localhost:51146/api/properties/'

        var service = {
            getProperties: getProperties,
            addProperty: addProperty,
            deleteProperty: deleteProperty,
            editProperty: editProperty
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

        function addProperty(city,zip,street,squareft,bedrooms,bathrooms,rent,description){

            var defer = $q.defer();

            var newProperty = {city: city, zip: zip, squareft: squareft, bedrooms: bedrooms, bathrooms: bathrooms, rent: rent, description: description};

            $http({
                    method: 'POST',
                    url: url, 
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: newProperty
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

        function deleteProperty(propertyId){

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: url + propertyId,
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

         function editProperty(data){

            var defer = $q.defer();

            $http({
                    method: 'PUT',
                    url: url + data.PropertyId,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: data
                }).then(function(response) {
                        if (response.status = 204) {
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
