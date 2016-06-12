(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('selectMedicineController', selectMedicineController);

    // LoginController.$inject = ['$location', 'UserService'];
    function selectMedicineController($timeout, $state, UserService, MedicineService, $ionicHistory, $scope, $ionicPlatform) {
        var vm = this;
        vm.sendBackToSearch = sendBackToSearch;
        vm.suggestions = MedicineService.suggestions;
        vm.selectedSuggestion;
        vm.selectedS = selectedS;

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        var doCustomBack= function() {
          $state.go('app.welcome');
          // do something interesting here
        };
        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack= $ionicPlatform.registerBackButtonAction(
            doCustomBack, 101
        );

        $scope.$on('$destroy', function() {
            deregisterHardBack();
        });

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
