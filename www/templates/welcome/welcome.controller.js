app.controller('welcomeScreenController', function ($scope, $state, $stateParams, ionicMaterialInk, UserService, MedicineService) {
    //ionic.material.ink.displayEffect();
    var vm = this;
    // ionicMaterialInk.displayEffect();
    vm.load = load;
    MedicineService.previousView = [];
    vm.goToMedicineSearch = goToMedicineSearch;

    load();
    function load(){
      vm.user = UserService.getPresentUser();
      UserService.autoLogin();
    }

    function goToMedicineSearch(){
      $state.go('app.searchMedicine');
    }
});
