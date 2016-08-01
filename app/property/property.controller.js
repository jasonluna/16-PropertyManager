//Creating PropertyController to pass user inputs to PropertyFactory

(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory', '$stateParams', 'localStorageService'];

    /* @ngInject */
    function PropertyController(PropertyFactory, $stateParams, localStorageService) {
        var vm = this;
        vm.title = 'PropertyController';
        vm.getProperties = getProperties;
        vm.addProperty = addProperty;
        vm.deleteProperty = deleteProperty;
        vm.editProperty = editProperty;
        vm.searchProperties = searchProperties;
        vm.searchPropertiesByUser = searchPropertiesByUser;
        vm.username = localStorageService.get("username");

        //Initializes Search Bar with null values
        vm.cityName = "";
        vm.minRent = 0;
        vm.maxRent = 0;
        vm.bedrooms = 0;
        vm.bathrooms = 0;

        //Defines scope variables to receive state parameters
        vm.cityName = $stateParams.cityName;
        vm.minRent = $stateParams.minRent;
        vm.maxRent = $stateParams.maxRent;
        vm.bedrooms = $stateParams.bedrooms;
        vm.bathrooms = $stateParams.bathrooms;

        activate();

        ////////////////

        function activate() {

            //Searches properties by users if user is logged in
            if (vm.username) {
                searchPropertiesByUser(vm.username);
            }

            //Performs advanced search with search terms passed into search parameters
            searchProperties(vm.cityName, vm.minRent, vm.maxRent, vm.bedrooms, vm.bathrooms);
        }

        //Creating function to call PropertyFactory's getPropreties method to get and store all properties
        function getProperties() {

            PropertyFactory.getProperties()
                .then(function(response) {

                        vm.properties = response.data;
                        toastr.success('Properties Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call PropertyFactory's addProperty method to add property
        function addProperty(city, zip, street, squareft, bedrooms, bathrooms, rent, description) {

            PropertyFactory.addProperty(city, zip, street, squareft, bedrooms, bathrooms, rent, description)
                .then(function(response) {

                        vm.properties.push(response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call PropertyFactory's delete property method to delete properties
        function deleteProperty(data) {
            var index = vm.properties.indexOf(data);
            PropertyFactory.deleteProperty(data.PropertyId).then(function(response) {

                    vm.propertyDel = response.data;
                    toastr.success('Property Successfully Deleted!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.properties.splice(index, 1);

        }

        //Creating function to call PropertyFactory's edit property method to update properties
        function editProperty(data) {

            PropertyFactory.editProperty(data)
                .then(function(response) {

                        toastr.success('Properties Updated!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call PropertyFactory's searchProperties method to advanced search
        function searchProperties(cityName, minRent, maxRent, bedrooms, bathrooms) {

            var searchQuery = { city: cityName, minRent: minRent, maxRent: maxRent, bedrooms: bedrooms, bathrooms: bathrooms };

            PropertyFactory.searchProperties(searchQuery)
                .then(function(response) {

                        vm.searchResults = (response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call PropertyFactory's searchPropertiesByUser method to return properties posted by current user
        function searchPropertiesByUser(userName) {

            var searchQuery = { userName: userName };

            PropertyFactory.searchPropertiesByUser(searchQuery)
                .then(function(response) {

                        vm.properties = (response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }
    }
})();
