(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('futureProspectsController', futureProspectsController);

    // LoginController.$inject = ['$location', 'UserService'];
    function futureProspectsController($state) {

      load();
      return;

      function load(){
        // $state.go('app.futureProspects');
      }
    }
})();
