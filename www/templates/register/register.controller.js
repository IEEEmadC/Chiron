(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('RegisterController', RegisterController);

    // LoginController.$inject = ['$location', 'UserService'];
    function RegisterController(UserService, $state, $timeout) {
        var vm = this;

        vm.register = register;
        vm.error = '';
        // login();

        // (function initController() {
        //     // reset login status
        //     UserService.ClearCredentials();
        // })();

        function register() {

          var result = UserService.register(vm.user);
          if (result.success){
            $timeout(function() {
              vm.error = ''
               $state.go('login');
             }, 0);
            console.log('Register Success');
          }
          else{
            vm.error = result.error;
          }
          console.log('User list', UserService.getAllUsers());
        };
    }

})();
