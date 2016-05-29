(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('selectMedicineController', selectMedicineController);

    // LoginController.$inject = ['$location', 'UserService'];
    function selectMedicineController($timeout, $state, UserService, MedicineService, $ionicHistory) {
        var vm = this;
        vm.sendBackToSearch = sendBackToSearch;
        vm.suggestions = MedicineService.suggestions;
        vm.selectedSuggestion;
        vm.selectedS = selectedS;

        return vm;

        function sendBackToSearch(){
          $ionicHistory.goBack();
        }

        function selectedS(selectedSuggestion){
          MedicineService.selectedMedicine = selectedSuggestion;
          $state.go('app.saltSelection');
        }
    }

})();
