(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('searchMedicineController', searchMedicineController);

    // LoginController.$inject = ['$location', 'UserService'];
    function searchMedicineController($timeout, $state, UserService) {
        var vm = this;

        vm.searchMedicine = searchMedicine;
        vm.error = '';

        function searchMedicine() {

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
