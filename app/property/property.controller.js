(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory'];

    /* @ngInject */
    function PropertyController(PropertyFactory) {
        var vm = this;
        vm.title = 'PropertyController';
        vm.getProperties = getProperties;
        vm.addProperty = addProperty;
        vm.deleteProperty = deleteProperty;
        vm.editProperty = editProperty;

        activate();

        ////////////////

        function activate() {
        	getProperties();
        }

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

         function addProperty(city,zip,street,squareft,bedrooms,bathrooms,rent,description) {

            PropertyFactory.addProperty(city,zip,street,squareft,bedrooms,bathrooms,rent,description)
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
    }
})();