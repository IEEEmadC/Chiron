(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('addSaltController', addSaltController);

    // LoginController.$inject = ['$location', 'UserService'];
    function addSaltController($timeout, $state, UserService, MedicineService, $scope, $ionicLoading, $ionicHistory, SaltService) {
        var vm = this;
        vm.addSalt = addSalt;
        vm.saltTypes = [{type: 'Definite', text: 'Definitely Allergic'},
                        {type: 'Probable', text: 'Probably Allergic'}]
        vm.salt = {saltType:'Definite'};
        vm.salt.addedSalt = SaltService.selectedSalt;

        return vm;

        function addSalt(){
          var newProbableSaltsAdded = [];
          var newDefiniteSaltsAdded = [];
          if (vm.salt.saltType == 'Definite'){
            if (MedicineService.definiteAllergicSalts.indexOf(vm.salt.addedSalt) == -1){
              MedicineService.definiteAllergicSalts.push(vm.salt.addedSalt);
              newDefiniteSaltsAdded.push(vm.salt.addedSalt);
            }
            UserService.setDefinitiveSaltsOfUser(UserService.getPresentUser().username, MedicineService.definiteAllergicSalts);
            MedicineService.newDefiniteSaltsAdded = newDefiniteSaltsAdded;
            MedicineService.previousView = [$ionicHistory.currentView().stateId, 'definitive'];
            $state.go('app.allergicSalts');
          }
          else{
            if (MedicineService.probableAllergicSalts.indexOf(vm.salt.addedSalt) == -1 &&
                MedicineService.definiteAllergicSalts.indexOf(vm.salt.addedSalt) == -1){
              MedicineService.probableAllergicSalts.push(vm.salt.addedSalt);
              newProbableSaltsAdded.push(vm.salt.addedSalt);
            }
            UserService.setProbableSaltsOfUser(UserService.getPresentUser().username, MedicineService.probableAllergicSalts);
            MedicineService.newProbableSaltsAdded = newProbableSaltsAdded;
            MedicineService.previousView = [$ionicHistory.currentView().stateId, 'probable'];
            $state.go('app.allergicSalts');
          }
        }

  }

})();
