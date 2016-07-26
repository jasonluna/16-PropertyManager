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

        activate();

        ////////////////

        function activate() {
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
    }
})();