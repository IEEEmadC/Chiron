(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('allergicSaltsController', allergicSaltsController);

    // LoginController.$inject = ['$location', 'UserService'];
    function allergicSaltsController($timeout, $state, UserService, MedicineService, $ionicHistory) {
        var vm = this;
        vm.probableAllergicSalts = MedicineService.probableAllergicSalts;
        vm.definiteAllergicSalts = MedicineService.definiteAllergicSalts;
        vm.newDefiniteSaltsAdded = MedicineService.newDefiniteSaltsAdded;
        vm.newProbableSaltsAdded = MedicineService.newProbableSaltsAdded;
        vm.previousView = MedicineService.previousView;
        vm.goHome = goHome;
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        return vm;

        function sendBackToSearch(){
          $ionicHistory.goBack();
        }

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        function goHome(){
          $state.go('app.welcome');
        }
    }

})();
