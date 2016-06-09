app.controller('welcomeScreenController', function ($scope, $stateParams, ionicMaterialInk, UserService, MedicineService) {
    //ionic.material.ink.displayEffect();
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.load = load;
    MedicineService.previousView = [];

    load();
    function load(){
      vm.user = UserService.getPresentUser();
    }

});
