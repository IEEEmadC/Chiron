app.controller('welcomeScreenController', function ($scope, $stateParams, ionicMaterialInk, UserService) {
    //ionic.material.ink.displayEffect();
    var vm = this;
    ionicMaterialInk.displayEffect();
    vm.load = load;

    load();
    function load(){
      vm.user = UserService.getPresentUser();
    }

});
