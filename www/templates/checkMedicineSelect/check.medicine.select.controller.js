(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('checkMedicineSelectController', checkMedicineSelectController);

    // LoginController.$inject = ['$location', 'UserService'];
    function checkMedicineSelectController($timeout, $state, UserService, MedicineService, $ionicHistory) {
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
          MedicineService.selectedMedicineForCheck = selectedSuggestion;
          $state.go('app.checkMedicineResults');
        }
    }

})();
