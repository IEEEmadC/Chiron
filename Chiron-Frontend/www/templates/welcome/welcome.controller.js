app.controller('welcomeScreenController', function ($scope, $state, $stateParams, ionicMaterialInk, UserService, MedicineService) {
    //ionic.material.ink.displayEffect();
    var vm = this;
    // ionicMaterialInk.displayEffect();
    vm.load = load;
    load();

    MedicineService.previousView = [];
    vm.goToMedicineSearch = goToMedicineSearch;
    vm.userActualName = UserService.getPresentUser().firstName;
    vm.numDefiniteAllergens = MedicineService.definiteAllergicSalts.length;
    vm.numProbableAllergens = MedicineService.probableAllergicSalts.length;


    function load(){
      vm.user = UserService.getPresentUser();
      UserService.autoLogin();
    }

    function goToMedicineSearch(){
      $state.go('app.checkMedicineSearch');
    }
});
