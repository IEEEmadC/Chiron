(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('selectMedicineController', selectMedicineController);

    // LoginController.$inject = ['$location', 'UserService'];
    function selectMedicineController($timeout, $state, UserService) {
        var vm = this;

        vm.login = login;
        vm.error = '';

        function login() {

          var result = UserService.login(vm.username, vm.password);
          if (result.success){
            $timeout(function() {
               vm.error = '';
               $state.go('app.welcome');
             }, 0);
          }
          else{
            vm.error = result.error;
          }
        };
    }

})();
