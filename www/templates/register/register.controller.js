(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('RegisterController', RegisterController);

    // LoginController.$inject = ['$location', 'UserService'];
    function RegisterController(UserService, $state, $timeout) {
        var vm = this;

        vm.register = register;
        // login();

        // (function initController() {
        //     // reset login status
        //     UserService.ClearCredentials();
        // })();

        function register() {

          var result = UserService.register(vm.user);
          if (result.success){
            $timeout(function() {
               $state.go('login');
             }, 0);
            console.log('Register Success');
          }
          else{
            console.log('Register Failed', result.error);
          }
          console.log('User list', UserService.getAllUsers());
        };
    }

})();
