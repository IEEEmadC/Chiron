(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('LoginController', LoginController);

    // LoginController.$inject = ['$location', 'UserService'];
    function LoginController($timeout, $state, UserService, $ionicHistory, MedicineService) {
        var vm = this;

        vm.login = login;
        vm.error = '';
        vm.goToRegister = goToRegister;
        MedicineService.previousView = [];
        $ionicHistory.nextViewOptions({
             disableAnimate: true,
             disableBack: true
        });

        function login() {

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

        function goToRegister(){
            $state.go('register');
        }
    }

})();
